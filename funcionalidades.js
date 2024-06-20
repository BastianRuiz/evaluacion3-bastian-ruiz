//se importa la función para guardar los datos
import { getData, getDocumento, remove, save, update, verNombre } from './firestore.js'
//id para guardar el id del documento 
let id = 0
//addEventListener permite activar el elemento según un evento(click)
document.getElementById('btnSave').addEventListener('click', async (event) => {
    
    event.preventDefault()
    //validamos que los campos no seas vacios
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })

    const lanz = document.getElementById('lanzamiento').value.trim()

    if (document.querySelectorAll('.is-invalid').length == 0) {
        const player = {
            lanz: document.getElementById('lanzamiento').value,
            nomJuego: document.getElementById('NombreJuego').value,
            NomCreador: document.getElementById('NombreCreador').value,
            fechaC: document.getElementById('fechaC').value,
            email: document.getElementById('email').value,
            fono: document.getElementById('fono').value,
            precio: document.getElementById('Precio').value
        }
        if (id == 0) {
            if (await verNombre(lanz)) {
                Swal.fire('esta fecha ya esta registrada', ' ', 'error');
                document.getElementById('nombre').classList.add('is-invalid');
            }
            else{
            //función que permite el guardado de datos
            save(player)
            Swal.fire('Guardado', ' ', 'success' )}}
            else{
            //permite editar los datos si el id es diferente de 0
                update(id,player)
        }}
        id = 0
        limpiar()
    }
)
//DOMCOntentLoaded es un evento que se ejecuta cuando se reacarga la página
window.addEventListener('DOMContentLoaded', () => {
    //getData función que trae la colección
    getData((datos) => {
        let tabla = ''
        //recorremos la colección y creamos el objeto emp que trae cada documento
        datos.forEach((player) => {
            //emp.data() trae los datos de cada documento
            const item = player.data()
            tabla += `<tr>
                <td>${item.lanz}</td>
                <td>${item.nomJuego}</td>
                <td>${item.NomCreador}</td>
                <td>${item.fechaC}</td>
                <td>${item.email}</td>
                <td>${item.fono}</td>
                <td>${item.precio}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${player.id}">Editar</button>
                    <button class="btn btn-danger" id="${player.id}">Eliminar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            //verificamos cual es el botón presionado
            btn.addEventListener('click', () => {
                //sweetalert que permite confirmarción
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro del juego?",
                    text: "no será posible revertir cambios",
                    icon: "estás seguro?",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    //presiono el botón eliminar
                    if (result.isConfirmed) {
                        //función eliminar
                        remove(btn.id)
                        id = 0
                        limpiar()
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Registro eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
        //seleccionar 
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                //invocar función que permite buscar el documento por id
                const doc = await getDocumento(btn.id)
                //asignar los valores del documento
                const player = doc.data()

                document.getElementById('lanzamiento').value = player.lanz
                document.getElementById('NombreJuego').value = player.nomJuego
                document.getElementById('NombreCreador').value = player.NomCreador
                document.getElementById('fechaC').value = player.fechaC
                document.getElementById('email').value = player.email
                document.getElementById('fono').value = player.fono
                document.getElementById('Precio').value = player.precio

                //asignamos el id del documento a la variable
                id = doc.id
            
                //btn cambie el valor a editar
                document.getElementById('btnSave').value = 'Editar'
            })
        })

    })
})