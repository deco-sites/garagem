import SignupForm from "site/islands/SignupForm.tsx";

function Signup() {
  return (
    <div class="max-w-xs md:max-w-lg xl:max-w-2xl">
        <div 
            class="bg-[#E5DECF] px-8 py-5 md:px-10 
            md:py-8 rounded-t-xl">
            <p 
                class="font-semibold text-black text-3xl"
            >
                Criar conta
            </p>
            <p 
                class="mt-2 font-normal text-black text-base"
            >
                Preencha seus dados que em breve nosso time vai entrar em contato com você para terminar seu cadastro.
            </p>
        </div>
        <SignupForm/>
    </div>
  );
}

export default Signup