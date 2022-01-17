import { AuthProvider } from "./context/auth.context";
import { MessagesProvider } from "./context/message.context";
import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient();

export const Provider = ({ children }) => {
    return (
        <AuthProvider>
            <MessagesProvider>
                <QueryClientProvider client={client}>{children}</QueryClientProvider>
            </MessagesProvider>
        </AuthProvider>
    );
};
