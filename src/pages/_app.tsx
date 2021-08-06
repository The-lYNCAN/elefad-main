import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedModal from "@components/common/modal/managed-modal";
import ManagedDrawer from "@components/common/drawer/managed-drawer";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ToastContainer } from "react-toastify";
// import { ReactQueryDevtools } from "react-query/devtools";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "@components/common/default-seo";
import {useState} from 'react'
import {AppWrapper} from './../contexts/userContext'
import { AuthSetup } from "@contexts/second";
import axios from 'axios'

// Load Open Sans and satisfy typeface font
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/satisfy";
// external
import "react-toastify/dist/ReactToastify.css";
// base css file
import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";
import { getDirection } from "@utils/get-direction";

function handleExitComplete() {
	if (typeof window !== "undefined") {
		window.scrollTo({ top: 0 });
	}
}

const Noop: React.FC = ({ children }) => <>{children}</>;
console.log("something from outside");


const CustomApp = ({ Component, pageProps }: AppProps) => {
	const [UserObject, setUserObject] = useState({})
	const queryClientRef = useRef<any>();
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}
	console.log("something needs to be logged here");
	const [user, setUser] = useState("Kushagar Choudhary")
	const router = useRouter();
	const dir = getDirection(router.locale);
	useEffect(() => {
		document.documentElement.dir = dir;
	}, [dir]);
	const Layout = (Component as any).Layout || Noop;
	// AuthSetup()
	useEffect(() => {
		// axios.post("http://localhost:3001/login", {email: "test@gmail.com", password: "test123"}).then((response) => {
				
		// })
		// axios.get("http://localhost:3001/getusername").then((res) => {
		// 	console.log(res);
			
		// })
		// fetch("http://localhost:3001/login", {
		// 	method:"POST",
		// 	body: JSON.stringify({email: "test@gmail.com", password: "test123"})
		// }).then(res => {
		// 	console.log(res);
			
		// }).catch((error) => {
		// 	console.log(error);
			
		// })
		const email = localStorage.getItem("email")
		const password = localStorage.getItem("password")
		console.log(email + password);
		

		axios({
			method:"POST",
			data: {
				"email": email,
				"password": password
			},
			withCredentials: true,
			url: "http://localhost:3001/login"
		}).then(res => {
			setUserObject(res.data)
			
			
		})

		// axios({
		// 	url: "http://localhost:3001/facebook",
		// 	method: "GET"
		// }).catch(error => {
		// 	console.log(error);
			
		// })
		
		
	}, [])
	return (
		<AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
			<QueryClientProvider client={queryClientRef.current}>
				<Hydrate state={pageProps.dehydratedState}>
					<ManagedUIContext>
						<Layout pageProps={pageProps} userObject={UserObject}>
							<DefaultSeo />
							<AppWrapper>
								{console.log(UserObject)}
								<Component {...pageProps} key={router.route} user={[user, setUser]} userObject={UserObject} />
							</AppWrapper>
							<ToastContainer />
						</Layout>
						<ManagedModal />
						<ManagedDrawer />
					</ManagedUIContext>
				</Hydrate>
				{/* <ReactQueryDevtools /> */}
			</QueryClientProvider>
		</AnimatePresence>
	);
};

export default appWithTranslation(CustomApp);