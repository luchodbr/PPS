export class Usuario
{
    id: string;
    nombre: string;
    dni: string;
    domicilio: string;
    telefono: number;
    email: string;
    pass: string;
    rol: string;

    public Usuario()
    {
        this.rol = "Usuario";
    }

    public static CrearUsuario(id: string, nombre:string, dni:string,
                                domicilio: string, telefono: number, email: string, rol:string) : Usuario
    {
        let usuario = new Usuario();
        usuario.id = id;
        usuario.nombre = nombre;
        usuario.dni = dni;
        usuario.domicilio = domicilio;
        usuario.telefono = telefono;
        usuario.email = email;
        usuario.rol = rol;

        return usuario;
    }   
}