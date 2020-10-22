<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use App\Roles;
class User extends Authenticatable
{
    use Notifiable;
    protected $table = 'users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];
    protected $primaryKey = 'id';
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'remember_token',
    ];
    public function roles(){
        return $this->belongsToMany('App\Roles');
    }
    public function hasRole($role){
        //dd($this->roles()->where('name',$role)->first());
        if($this->roles()->where('name',$role)->first())
        {
            return true;
        }
        return false;
    }
    /**
     * Elimina dispositivos con el cliente y reparacion
     *
     * @param $query
     * @param $num_devices_exist_clients
     */
    public function scopeCustomDelete($query) {
        $query->each(function ($users) {
            $id = $users->roles[0]->id;
            $users->roles()->detach($id);
        });
        $query->delete();
        return $query;
    }
    public function _update(Request $request)
    {
        $role_admin = Roles::where('name','Admin')->first();
        $role_invitado = Roles::where('name','Invitado')->first();
        $input = $request->all();
        $this->name = isset($input['nombre']) ? $input['nombre'] : '';
        $this->email = isset($input['email']) ? $input['email'] : '';
        if(isset($input['password']))
        {
            $this->password = Hash::make($input['password']);
        }
        $rol_id = isset($this->roles) ? $this->roles[0]->id : '';
        if($rol_id != $input['rol'])
        {
            $this->roles()->detach($rol_id);
            if($input['rol'] == 1)
            {
                $this->roles()->attach($role_admin);
            }
            else
            {
                $this->roles()->attach($role_invitado);
            }
        }
        $this->update();
        return response()->json([
            'status' => 'success'
        ]);

    }
}
