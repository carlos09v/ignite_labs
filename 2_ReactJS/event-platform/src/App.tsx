import { ApolloProvider } from "@apollo/client"
import { client } from "./lib/apollo"
import { BrowserRouter } from 'react-router-dom'
import Router from "./Router"

// CMS = Content Management System
// Traz tanto o painel de ADMIN tanto qnto a parte visual do front-end (temas) Ex: WordPress

// Headless CMS (GraphCMS): Painel de ADMIN (dados fornecidos através de uma API Rest ou GraphQL)

// Operações no GraphQL:
// query / mutation
// query = buscar dados
// mutation = criar, alterar ou deletar dados



function App() {
  // const { data } = useQuery(GET_LESSONS_QUERY)

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
