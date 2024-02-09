// "use client";

// import { useState } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// export default function Provider({ children }) {
//   const [queryClient] = useState(() => {
//     new QueryClient({
//       defaultOptions: {
//         queries: {
//           staleTime: 3 * 1000,
//           refetchInterval: 3 * 1000,
//         },
//       },
//     });
//   });

//   return (
//     // <SessionProvider>
//     <QueryClientProvider client={queryClient}>
//       <ReactQueryDevtools />
//       {children}
//     </QueryClientProvider>
//     // </SessionProvider>
//   );
// }
