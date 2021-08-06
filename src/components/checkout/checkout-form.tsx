import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/cart/cart.context";
import axios from "axios";
// import Razorpay from 'razorpay'

interface CheckoutInputType {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	address: string;
	city: string;
	zipCode: string;
	save: boolean;
	note: string;
}

const CheckoutForm: React.FC = ({userObject}) => {
	const { t } = useTranslation();
	const { mutate: updateUser, isLoading } = useCheckoutMutation();
	const { items, total, isEmpty } = useCart();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutInputType>();
	function onSubmit(input: CheckoutInputType) {
		console.log(items);
		console.log(total);
		console.log(isEmpty);
		console.log(userObject);
		
		
		// updateUser(input);
		var backend = {}
		const data = fetch("http://localhost:3001/pay", {method: "POST"}).then(daata => {
			// console.log(something.json())
			const dinal = daata.json().then(d => {
				console.log(d);
				backend = d
			})
			// console.log(daata);
			
			// const m = something.json()
			// console.log(m);
			console.log(dinal);
			// console.log(JSON.stringify(something));
			
			
			// const id = json(something)
		})
		
		console.log(data);
		setTimeout(() => {
			console.log(backend);
			
			const keyId = "rzp_test_jXiNEklr7OXc6X"
			const secret = "Gcad54zyPJt8c8uxIjntleJc"
			console.log(input);
			
			var options = {
				"key": keyId, // Enter the Key ID generated from the Dashboard
				"amount": "5000000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
				"currency": "INR",
				"name": `${input.firstName} ${input.lastName}`,
				"description": input.note,
				"image": "https://example.com/your_logo",
				"order_id": backend.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
				"callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
				"prefill": {
					"name": `${input.firstName} ${input.lastName}`,
					"email": input.email,
					"contact": input.phone
				},
				"notes": {
					"address": input.address
				},
				"theme": {
					"color": "#3399cc"
				},
				"handler": function(response){
					console.log(response);
					axios({
						url: "http://localhost:3001/placeorder",
						method: "POST",
						data: {
							razorResponse: response,
							userId: userObject,
							products: {items: items, total: total, isEmpty: isEmpty}
						}
					}).then(res => {
						console.log(res);
						
					})
					
					
					// Router.push(ROUTES.ORDER);
				}
			};
			const instance = new Razorpay(options)
			instance.open()
		}, 2000)
		
		// console.log(res);
		// console.log(data);
		
		

	}

	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-shipping-address")}
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 lg:space-y-5">
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							labelKey="forms:label-first-name"
							{...register("firstName", {
								required: "forms:first-name-required",
							})}
							errorKey={errors.firstName?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
						/>
						<Input
							labelKey="forms:label-last-name"
							{...register("lastName", {
								required: "forms:last-name-required",
							})}
							errorKey={errors.lastName?.message}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
						/>
					</div>
					<Input
						labelKey="forms:label-address"
						{...register("address", {
							required: "forms:address-required",
						})}
						errorKey={errors.address?.message}
						variant="solid"
					/>
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							type="tel"
							labelKey="forms:label-phone"
							{...register("phone", {
								required: "forms:phone-required",
							})}
							errorKey={errors.phone?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
						/>

						<Input
							type="email"
							labelKey="forms:label-email-star"
							{...register("email", {
								required: "forms:email-required",
								pattern: {
									value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "forms:email-error",
								},
							})}
							errorKey={errors.email?.message}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
						/>
					</div>
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							labelKey="forms:label-city"
							{...register("city")}
							variant="solid"
							className="w-full lg:w-1/2 "
						/>

						<Input
							labelKey="forms:label-postcode"
							{...register("zipCode")}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
						/>
					</div>
					<div className="relative flex items-center ">
						<CheckBox labelKey="forms:label-save-information" />
					</div>
					<TextArea
						labelKey="forms:label-order-notes"
						{...register("note")}
						placeholderKey="forms:placeholder-order-notes"
						className="relative pt-3 xl:pt-6"
					/>
					<div className="flex w-full">
						<Button
							className="w-full sm:w-auto"
							loading={isLoading}
							disabled={isLoading}
						>
							{t("common:button-place-order")}
						</Button>
					</div>
				</div>
			</form>
		</>
	);
};

export default CheckoutForm;
