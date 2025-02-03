import { useNavigate } from "react-router-dom"
import { db } from '../services/firebase'
import { collection, doc, getDoc, setDoc, updateDoc, addDoc } from "firebase/firestore"

export const useFirestore = () => {
  const navigate = useNavigate()

  const createDocumentWithCode = async<T>(collectionName: string, data: T, code: string) => {
    const DataCollection = collection(db, collectionName)
    const counterDoc = doc(DataCollection, 'counter')

    try {
      const counterSnapshot = await getDoc(counterDoc)
  
      let currentCounter = 0;
      if (counterSnapshot.exists()) {
        currentCounter = counterSnapshot.data().count
      } else {
  
        await setDoc(counterDoc, { count: 0 })
        console.log("Documento 'counter' criado com sucesso.")
      }
      const newCounter = currentCounter + 1
  
      await updateDoc(counterDoc, { count: newCounter })
  
      const newCode = `${code}-${newCounter.toString().padStart(3, '0')}`
      const DataWithCode = { ...data, code: newCode };
  
      await addDoc(DataCollection, DataWithCode)
      console.log('Dados adicionados com sucesso!')
      navigate(-1)
    } catch (error) {
      console.error('Erro ao adicionar dados:', error)
    }
  }

  const updateDocument = async<T>(collectionName: string, data: T, id: string) => {
    if (!id) return
    
    const DataCollection = collection(db, collectionName)
    const DataDoc = doc(DataCollection, id)

    try {
      await updateDoc(DataDoc, data);
      console.log('Dados atualizados com sucesso!')
      navigate(-1)
    } catch (error) {
      console.error('Erro ao atualizar dados:', error)
    }
  }

  return { createDocumentWithCode, updateDocument }
}