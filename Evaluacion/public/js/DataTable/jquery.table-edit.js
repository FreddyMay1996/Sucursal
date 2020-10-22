
;(function ($, window, document, undefined) {
    var pluginName = "editable",
        defaults = {
            useCustomDropdowns: false, //bool para usar array de objetos y agregar value en los option del select
            addIndex: false, //agrega el id del elemento
            indexSelector:'',//selector del index
            inputClass: '', //class de los input
            corporateSelector: '',
            keyboard: true,
            dblclick: true,
            tab: false,
            button: true,
            buttonSelector: ".edit",
            maintainWidth: true,
            dropdowns: {},
            edit: function() {},
            beforeEdit: function() {},
            save: function() {},
            cancel: function() {}/*,*/
            /*onTabPress: function() {}*/
        };

    function editable(element, options) {
        this.element = element;
        $.fn.exist = function() {
            return this.length > 0;
        };

        this.options = $.extend({}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;
        this.$table = $(element).parents('table');
        this.init();
    }

    editable.prototype = {
        init: function() {
            this.editing = false;

            if (this.options.dblclick) 
                $(this.element)
                    .css('cursor', 'pointer')
                    /*.find('td:not(.no-editable)') */ //agrega evento dblclick a los td de la tabla 
                    .bind('dblclick', this.toggle.bind(this));/*.on('blur',function(){
                        console.log('cambie de fila');
                    });*/
            

            if (this.options.button) 
                $(this.options.buttonSelector, this.element)
                    .bind('click', this.toggle.bind(this));
            
        },
        _changeRow: function(el) {
            var otherTr = $(el).siblings().filter(function(){
                    return $(this).hasClass('selected');
                });
            if( otherTr.length > 0 ) {
                var e = jQuery.Event("keydown");
                e.which = 13; // # Some key code value
                otherTr.each((i,el)=>{
                    $(el).removeClass('selected');
                    $(el).find('input').first().trigger(e);
                });
                //$(otherTr).find('input')
            }
        },

        toggle: function(e) {
            console.log('doble click');
            e.preventDefault();
            this.editing = !this.editing;
            if ( this.editing ) {
                this.beforeEdit();// se dispara antes de editar
                this.edit();
            } else {
                this.save();
            }
        },

        _reset: function() {
            this.editing = false;
            $(this.element).find('td[data-field]')//limpia data de los td
                .removeData();
        },

        onTabPress: function() { //cuando se presiona tab durante la edicion
            if ( !this.editing )
                return;
            let index = $(this.element).index() + 1;
            this.save();
            this.editing = false;
            let $rows = this.$table.find(`> tbody tr[role=row]`);
            let $next = $($rows.get(index)); 
            if ( !$next.exist() ) 
                return;
            //$next.trigger('dblclick');
            let _editable = $next.data(`plugin_${this._name}`);
            if ( _editable === undefined )
                return;
            _editable.editing = true;
            _editable.__proto__.beforeEdit
                .apply(_editable);
            _editable.__proto__.edit
                .apply(_editable);
        },

        beforeEdit: function() { //funcion que se ejecuta antes de hacer la fila editable
            var instance = this,
                values = {};
            $('td[data-field]', this.element).each(function() {
                var field = $(this).data('field'),
                value = $.trim($(this).text());
                if ( $(this).data('value') !== undefined ) {
                    value = $(this).data('value');
                }
                values[field] = value;
            });
            if(instance.options.addIndex){
                value = $(instance.options.indexSelector,this.element).val()
                values['index'] = value;
            }
            instance._changeRow(instance.element);
            $(instance.element).addClass('selected'); 
            this.options.beforeEdit.bind(this.element)(values);
        },

        edit: function() {
            var instance = this,
                values = {};
            let _input = null;    
            $('td[data-field]', instance.element).each(function(i,el) {
                var input,
                    inputType = $(this).data('type'), //tipo de input que sera creado
                    field = $(this).data('field'),
                    value = $.trim($(this).text()),
                    width = $(this).width(),
                    datavalue = $(this).data('value'),
                    corpId = () => $(instance.options.corporateSelector).val();

                values[field] = value;
                var validTypes = ['number','text','phone','search'];
                inputType = validTypes.includes(inputType) ? inputType : 'text'; // tipo de input      
                $(el).empty();

                if (instance.options.maintainWidth) 
                    $(el).width(width);

                if (field in instance.options.dropdowns) {
                    input = $('<select class="'+instance.options.inputClass+'"></select>');

                    for (var i = 0; i < instance.options.dropdowns[field].length; i++) {
                        let $option = null;
                        let id = corpId(); // id del corporativo tomado del select
                        if ( !instance.options.useCustomDropdowns ) { // CUSTOM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            $option = $('<option></option>')
                                 .text(instance.options.dropdowns[field][i]);
                        } else { 
                            var option = instance.options.dropdowns[field][i];
                            $option = $('<option></option>')
                                .attr('value', option.value)
                                .attr('data-price', option.price)
                                .text(option.text);
                        }
                        if ( id !== undefined && id !== null && id != '' ) // si corporateselector esta definido y encuentra el input select
                            if ( id == option.corporate )
                                $option.appendTo(input);
                            else
                                continue;
                        else      
                            $option.appendTo(input); // comportamiento normal
                    };
                    let val = instance.options.useCustomDropdowns ? datavalue : value;
                    input.val(val)
                        .data('old-value',val)
                        .dblclick(instance._captureEvent);
                } else {
                    input = $('<input class="'+instance.options.inputClass+
                        '" type="'+inputType+'" '+(inputType == 'number' ? 'min="0"' : '-')+' />')
                        .val(value)
                        .data('old-value', value)
                        .dblclick(instance._captureEvent);
                }

                if (instance.options.keyboard) 
                    input.keydown(instance._captureKey.bind(instance));
                input.appendTo(el)
                    .focus();
            });
            this.options.edit.bind(this.element)(values);
        },

        save: function() {
            var instance = this,
                values = {};
            var $table = instance.$table;
            
            $('td[data-field]', instance.element).each(function(i,el) {
                var $input = $(':input', el); //input dentro del td
                var value = $.trim( $input.val() );
                var inputSelectVal = null;
                if ( $input.length > 0 ) 
                    if ( $input[0].tagName === 'SELECT' ) { //para input select
                        var $select = $input,
                        $option = $input.find('>option:selected');

                        $(el).data('value', $select.val()); //asigna valor a propiedad data de td
                        if ( $option.length > 0 )
                            value = $.trim($option.text());
                    } 

                values[$(el).data('field')] = $.trim( $input.val() );

                $(el).empty()
                       .text(value);
            });
            //$(instance.element).removeClass('selected');
            instance.options.save.bind(instance.element)(values,instance);
        },

        cancel: function() { 
            var instance = this,
                values = {};

            $('td[data-field]', this.element).each(function() { 
                var value = $(':input', this).data('old-value');
                if ( $(':input', this)[0].tagName === 'SELECT' ) { //para input select
                    var $select = $(':input', this),
                    $option = $select.find('>option:selected');

                    value = $option.text();
                } 
                values[$(this).data('field')] = value;

                $(this).empty()
                       .text(value);
            });
            $(instance.element).removeClass('selected');
            this.options.cancel.bind(this.element)(values);
        },

        revert: function(values) {
            var dropdowndata = this.options.dropdowns;
            $('td[data-field]', this.element).each(function(i,el) {
                var key = $(el).data('field');
                var value = values[key];
                if ( key == 'type' ) {
                    var text = value;
                    dropdowndata[key].forEach((item, j) => { // validacion para dropdowntexto de dropdown
                        if ( item.value == value )
                           text = item.text;
                    });
                    $(el).text($.trim(text));
                } else {
                    $(el).text($.trim(value));
                }
            });
        },

        _captureEvent: function(e) {
            e.stopPropagation();
        },

        _captureKey: function(e) {
            if (e.which === 13) {
                this.editing = false;
                this.save();
            } else if (e.which === 27) {
                this.editing = false;
                this.cancel();
            } else if ( e.which === 9 ) {
                e.preventDefault();
                if ( this.options.tab ) 
                    this.onTabPress();
            }
        }
    };

    $.fn[pluginName] = function(options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new editable(this, options));
            }
        });
    };

})(jQuery, window, document);
