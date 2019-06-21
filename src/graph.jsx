import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {withClientState} from 'apollo-link-state';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import {getOperationAST} from 'graphql';

// docker-compose exec app bash
// node ./FragmentGenerator.jsx
/*import introspectionQueryResultData from '../fragmentTypes.json';
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});*/

//import { defaults, resolvers } from './resolvers/todos';

export default({
  introspectionResult,
  url,
  initState,
  client: {
    resolvers,
    defaults,
    typeDefs
  }
}) => {

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult
  });

  const cache = new InMemoryCache( { fragmentMatcher }).restore(initState)

  const stateLink = withClientState({resolvers, defaults, cache, typeDefs});

  return ({
    graph: new ApolloClient({
      link: stateLink.concat(new HttpLink({
        uri: url/*, credentials: 'include'*/
      })),
      cache //,
      //ssrForceFetchDelay: 100
    })
  })
}
