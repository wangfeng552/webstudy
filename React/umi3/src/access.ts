export default function access(initialState:any) {
  const { currentUser } = initialState ?? {};
  console.log('initialState',initialState);
  
  return {
    isWorker: true,
  };
}