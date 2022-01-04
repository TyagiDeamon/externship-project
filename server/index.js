import emailServer from "./config/emailServer.js";
import mainServer from "./config/mainServer.js";

mainServer.listen(process.env.PORT, () => {
	console.log(`MainServer is working on port ${process.env.PORT}`);
});

emailServer.listen(process.env.EMAIL_PORT, () => {
	console.log(`EmailServer is working on port ${process.env.EMAIL_PORT}`);
});
