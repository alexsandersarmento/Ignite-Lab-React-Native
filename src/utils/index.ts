import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

const dateFormat = (timestamp: FirebaseFirestoreTypes.Timestamp) => {
  if (timestamp) {
    const date = new Date(timestamp.toDate())
    const day = date.toLocaleDateString('pt-BR')
    const time = date.toLocaleTimeString('pt-BR')

    return `${day} às ${time}`
  }
}

export { dateFormat }
