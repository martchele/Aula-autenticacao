import { server } from "./server";

const port: number = 3000;

server.listen(port, () => {
    console.log(`Servidor escutando no endereço http://localhost:${port}/`);
});