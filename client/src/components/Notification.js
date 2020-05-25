import React from "react"

const ProductList = () => {
const [data, setData] = React.useState([])

React.useEffect(() => {
    let eventSource = new EventSource("http://localhost:3000/hostevents")
    eventSource.onmessage = e => updateProdutList(JSON.parse(e.data))
  }, [])

  const updateProdutList = (data) => {
    setData(data);
    console.log(data)
  }

  return (
      <h1> </h1>
    
  )
}

export default Notification;