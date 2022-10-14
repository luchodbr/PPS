export class Imagen
{
    id: string;
    url: string;
    base64: string;
    usuario: string;
    nombreUsuario: string;
    fecha: string;

    public Imagen()
    {
    }

    public static CrearImagen(id: string, base64: string, url: string, usuario: string, 
                            nombreUsuario: string,fecha: string)
    {
        let imagen = new Imagen();

        imagen.id = id;
        imagen.base64 = base64;
        imagen.url = url;
        imagen.usuario = usuario;
        imagen.nombreUsuario = nombreUsuario;
        imagen.fecha = fecha;
        
        return imagen;
    }
}

