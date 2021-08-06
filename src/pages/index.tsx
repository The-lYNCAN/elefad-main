import BannerCard from "@components/common/banner-card";
import Container from "@components/ui/container";
import BrandBlock from "@containers/brand-block";
import CategoryGridBlock from "@containers/category-grid-block";
import FeatureBlock from "@containers/feature-block";
import Layout from "@components/layout/layout";
import CollectionBlock from "@containers/collection-block";
import Divider from "@components/ui/divider";
import ProductsWithFlashSale from "@containers/products-with-flash-sale";
import DownloadApps from "@components/common/download-apps";
import Support from "@components/common/support";
import HeroWithCategory from "@containers/hero-with-category";
import BannerGridBlock from "@containers/banner-grid-block";
import BestSellerProductFeed from "@components/product/feeds/best-seller-product-feed";
import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
import Subscription from "@components/common/subscription";
import { homeOneBanner as banner } from "@framework/static/banner";
import { ROUTES } from "@utils/routes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
// import { useContext } from "react";
import { useAppContext } from "@contexts/userContext";
// import { UserContext } from "./../contexts/userContext";
// import {Back} from '@contexts/second'
import { useEffect } from "react";
import Head from "next/head";

const flashSaleCarouselBreakpoint = {
	"1281": {
		slidesPerView: 1,
		spaceBetween: 28,
	},
	"768": {
		slidesPerView: 2,
		spaceBetween: 20,
	},
	"0": {
		slidesPerView: 1,
		spaceBetween: 12,
	},
};

export const ComponentDidMount = () => {

	// console.log(localStorage.getItem("test"));
	// console.log(localStorage.getItem("test"));


	
}

export default function Home() {
	console.log("should only log in browser and not in server ie terminal");
	// console.log(localStorage);
	setTimeout(() => {
		
	}, 1000)
	useEffect(() => {
		console.log(localStorage.getItem("test"));
		localStorage.removeItem("test2")
		console.log("something here");
		

	}, [])
	
	
	
	
	// const user = Back()
	
	
	
	// setUser("Kushagar")
	
	
	

	
	return (
		<Container>
			
			{/* <HeroWithCategory /> */}
			<ProductsWithFlashSale carouselBreakpoint={flashSaleCarouselBreakpoint} />
			<BannerGridBlock />
			<CategoryGridBlock sectionHeading="text-featured-categories" />
			<Divider />
			<BestSellerProductFeed />
			<BannerCard
				key={`banner--key${banner.id}`}
				banner={banner}
				href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
				className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
			/>
			<NewArrivalsProductFeed />
			<Divider />
			<BrandBlock sectionHeading="text-top-brands" />
			<FeatureBlock />
			<CollectionBlock />
			<DownloadApps />
			<Support />
			<Subscription />
		</Container>
	);
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
