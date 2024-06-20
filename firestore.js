 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc, getDocs, query, where} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAPm10wXs6W9kyVNiO36awdNIVoUHZLo1c",
    authDomain: "proyectojuegos-b1086.firebaseapp.com",
    projectId: "proyectojuegos-b1086",
    storageBucket: "proyectojuegos-b1086.appspot.com",
    messagingSenderId: "238864378626",
    appId: "1:238864378626:web:0462741582f20608ed301b"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //Función de firestore que permite retornar la base de datos para su utilización
const db = getFirestore(app)

//función para guardar los datos en firestore
export const save = (jugador) => {
    //addDoc es la función de firestore que permite añadir un nuevo documento
    //collection es la función de firestore que permite traer la colección de la db
    addDoc(collection(db, 'Jugadores'), jugador)
}

//función que permite obtener la colección 
export const getData = (data) => {
    //onSnapshot permite retornar la colleción y asignarla a la variable data 
    onSnapshot(collection(db, 'Jugadores'), data)
}

//función remove, permite eliminar un registro según su id
export const remove = (id) => {
    //deleteDoc es una función de firestore que permite quitar un documento de la colección
    //doc es una función de firestore que permite buscar un documento por su id
    deleteDoc(doc(db, 'Jugadores', id))
}

//función getDocument nos permite obtener un documento según su id 
//getDoc permite traer un documento según si id y acceder a sus valores
export const getDocumento = (id) => getDoc(doc(db, 'Jugadores', id))

//función update permite editar un documento
export const update = (id,player) =>{
    //updateDoc es una funcioón de firestore que permite modificar un documento
    updateDoc(doc(db,'Jugadores',id),player)
}

export const verFecha = async (fecha) => {
    const q = query(collection(db, 'Jugadores'), where('lanz', '==', fecha)); 
    const querySnapshot = await getDocs(q); 
    return !querySnapshot.empty;
}
