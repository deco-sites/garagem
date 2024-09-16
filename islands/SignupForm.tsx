import { useState } from 'preact/hooks';
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from 'npm:@hookform/resolvers/yup'
import { string, object, InferType } from 'npm:yup'

import "preact/debug";

const emailRgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignupSchema = object().shape({
   	nomeCompleto: string()
		.required('Preechimento obrigatório')
		.min(3, 'Limite mínimo de caracteres não atendido!')
		.max(100, 'Limite de caracteres excedido!')
		.matches(/^[aA-zZ\s]+$/, "Não são permitidos números ou caracteres especiais!"),
   	creci: string()
		.required('Preechimento obrigatório')
		.min(6, 'Limite mínimo de caracteres não atendido!')
		.max(100, 'Limite de caracteres excedido!'),
	telefone: string()
			.required('Preechimento obrigatório')
			.matches(/^\d+$/, "Apenas números são permitidos!"),
   	email: string()
		.required('Preechimento obrigatório')
		.email('E-mail inválido')
		.matches(emailRgx, 'E-mail inválido'),
	faturamentoMensal: string()
		.required('Preechimento obrigatório'),
	carteiraImovel: string()
		.required('Preechimento obrigatório')
});

type FormData = InferType<typeof SignupSchema>;

function SignupForm() {
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		mode: 'onChange',
		resolver: yupResolver(SignupSchema)
	});

  	const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
		try {
			const response = await fetch('/api/proxy', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error('Failed to send data!');
			}
			setSuccessMessage('Formulário enviado com sucesso!');
			console.log('Dados enviados com sucesso:', data);
		} catch (error) {
			setSuccessMessage('Erro ao enviar os dados, tente novamente.');
			console.error('Erro ao enviar os dados:', error);
		}
	};

  return (
    <form
		class="px-8 py-5 md:p-10  flex flex-col gap-9"
		onSubmit={handleSubmit(onSubmit)}
	>
		<div
			class="bg-white grid grid-cols-1 md:grid-cols-2 
			gap-y-4 gap-x-9 rounded-b-xl"
		>
			<label 
				for="nome"
				class="block mt-1 text-sm font-medium text-black"
			>
				Nome Completo*<input 	
							type="text"
							id="nomeCompleto"
							class={`
								${errors.nomeCompleto ? `border-red-500 text-red-500 
									focus:border-red-500 focus:ring-red-500 peer`
								: `border-slate-300 text-black focus:border-primary 
								focus:ring-primary`
								}
								py-3 px-10 bg-white border shadow-sm
								placeholder-stone-500 focus:outline-none 
								focus:border-primary focus:ring-primary
								block w-full rounded-md sm:text-sm focus:ring-1 
								disabled:shadow-none mt-1 text-base	
							`}
							placeholder="Jhon Don"
							{...register('nomeCompleto', {required: true})}
						/>
				<p class="mt-2 text-red-500 text-xs h-4">
					{errors.nomeCompleto?.message}
				</p>
			</label>
			<label 
				for="creci"
				class="block mt-1 text-sm font-medium text-black"
			>
				CRECI*<input 	
							type="text"
							id="creci"
							class={`
								${errors.creci ? `border-red-500 text-red-500 
									focus:border-red-500 focus:ring-red-500 peer`
								: `border-slate-300 text-black focus:border-primary focus:ring-primary`}
								py-3 px-10 bg-white border shadow-sm
								border-slate-300 placeholder-stone-500 disabled:bg-slate-50
								disabled:text-slate-500 disabled:border-slate-200
								focus:outline-none focus:border-primary focus:ring-primary
								block w-full rounded-md sm:text-sm focus:ring-1 disabled:shadow-none mt-1 text-base	
							`}
							placeholder="J-0000"
							{...register('creci', {required: true})}
						/>
				<p class="mt-2 text-red-500 text-xs h-4">
					{errors.creci?.message}
				</p>
			</label>
			<label 
				for="telefone"
				class="block mt-1 text-sm font-medium text-black"
			>
				Telefone*<input 	
							type="text"
							id="telefone"
							class={`
								${errors.telefone ? `border-red-500 text-red-500 
									focus:border-red-500 focus:ring-red-500 peer`
								: `border-slate-300 text-black focus:border-primary focus:ring-primary`}
								py-3 px-10 bg-white border shadow-sm
								border-slate-300 placeholder-stone-500 disabled:bg-slate-50
								disabled:text-slate-500 disabled:border-slate-200
								focus:outline-none focus:border-primary focus:ring-primary
								block w-full rounded-md sm:text-sm focus:ring-1 disabled:shadow-none mt-1 text-base	
							`}
							placeholder="(11) 99999-9999"
							{...register('telefone', {required: true})}
						/>
				<p class="mt-2 text-red-500 text-xs h-4">
					{errors.telefone?.message}
				</p>
			</label>
			<label 
				for="email"
				class="block mt-1 text-sm font-medium text-black"
			>
				E-mail*<input 	
							type="email"
							id="email"
							class={`
								${errors.email ? `border-red-500 text-red-500 
									focus:border-red-500 focus:ring-red-500 peer`
								: `border-slate-300 text-black focus:border-primary focus:ring-primary`}
								py-3 px-10 bg-white border shadow-sm
								border-slate-300 placeholder-stone-500 disabled:bg-slate-50
								disabled:text-slate-500 disabled:border-slate-200
								focus:outline-none focus:border-primary focus:ring-primary
								block w-full rounded-md sm:text-sm focus:ring-1 disabled:shadow-none mt-1 text-base	
							`}
							placeholder="seu@email.com"
							{...register('email', {required: true})}
						/>
				<p class="mt-2 text-red-500 text-xs h-4">
					{errors.email?.message}
				</p>
			</label>
			<label for="faturamentoMensal"
				class="block mt-1 text-sm font-medium text-black"
			>
				Faturamento mensal*<select 
					id="faturamentoMensal" 
					class="p-3 bg-white border border-slate-300 shadow-sm
					rounded-md w-full mt-1 text-stone-500"
					{...register('faturamentoMensal', {required: true})}
				>
					<option
						value="nenhum"
						selected
						disabled  
						hidden
						class="placeholder-stone-500"
					>
						Escolha uma opção
					</option>
					<option 
						value="1000000"
					>
						Até R$10.000,00
					</option>
					<option 
						value="5000000"
					>
						Até R$50.000,00
					</option>
					<option 
						value="10000000"
					>
						Até R$100.000,00
					</option>
					<option 
						value="20000000"
					>
						Até R$200.000,00
					</option>
					<option 
						value="20000000"
					>
						Mais de R$200.000,00
					</option>
				</select>
				<p class="mt-2 text-red-500 text-xs h-4">
					{errors.faturamentoMensal?.message}
				</p>
			</label>
			<label for="carteiraImovel"
				class="block mt-1 text-sm font-medium text-black"
			>
				Carteira de imóvel*<select 
					id="carteiraImovel" 
					class="p-3 bg-white border border-slate-300 shadow-sm
					rounded-md w-full mt-1 text-stone-500"
					{...register('carteiraImovel', {required: true})}
				>
					<option
						value="nenhum"
						selected
						disabled  
						hidden
						class="placeholder-stone-500"
					>
						Escolha uma opção
					</option>
					<option 
						value="Nenhum imóvel"
					>
						Nenhum imóvel
					</option>
					<option 
						value="0-50"
					>
						0-50
					</option>
					<option 
						value="51-100"
					>
						51-100
					</option>
					<option 
						value="101-500"
					>
						101-500
					</option>
					<option 
						value="501-1000"
					>
						501-1000
					</option>
					<option 
						value="Mais de 1000"
					>
						Mais de 1000
					</option>
				</select>
				<p class="mt-2 text-red-500 text-xs h-4">
					{errors.carteiraImovel?.message}
				</p>
			</label>
    	</div>
		<div class="flex justify-between">
			<div class="w-6/12">
				{successMessage && (
					<p class={`${successMessage.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}>
						{successMessage}
					</p>
				)}
			</div>
			<button 
				type="submit"
				class="py-3.5 px-4 rounded-lg
				bg-primary text-white text-sm
				font-semibold shadow-custom
				w-44 text-center self-end"
			>
				Cadastrar
			</button>
		</div>
    </form>
  );
}
export default SignupForm;