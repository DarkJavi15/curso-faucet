import { useEffect, useState } from 'react'
import './App.css'
const {ethereum} = window



function App() {
  const [cuenta, setCuenta] = useState(null)
  const [saldo, setSaldo] = useState("")

  async function enviarEth() {
    const response = await fetch(`http://localhost:4000/enviar/${cuenta}`);
    const datos = await response.json();
    setSaldo(datos);
    console.log("uwu", cuenta);
  }

  useEffect(()=>{
    if (ethereum != undefined) {
      ethereum.request({ method:'eth_requestAccounts'}).then(cuentas => {
        console.log(cuentas)
        setCuenta(cuentas[0])
        ethereum.on("accountsChanged", (cuentas) => {
          setCuenta(cuentas[0])
        })
      })
    } else {
      setCuenta("No se ha detectado Metamask instalado")
    }
    
  }, [])

  return (
    <div>
      <div>
        Cuenta: {cuenta}
      </div>
      <button onClick={(() => enviarEth())} className="btn btn-primary mt-3">Enviar ETH</button>
    </div>
  )
}

export default App
