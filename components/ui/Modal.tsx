import SignupForm from "site/islands/SignupForm.tsx";
import { useEffect } from "preact/hooks";
import IconX from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/x.tsx"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeText?: string;
}

function Modal({ isOpen, onClose, closeText = "Close" }: ModalProps) {

  function handleBackgroundClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains("modal-background")) {
      onClose();
    }
  }

  	useEffect(() => {
		if (isOpen) {
		document.body.classList.add("overflow-hidden");
		} else {
		document.body.classList.remove("overflow-hidden");
		}
		return () => {
		document.body.classList.remove("overflow-hidden");
		};
 	}, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div class="fixed z-50 inset-0 overflow-y-auto" onClick={handleBackgroundClick}>
      	<div class="flex items-center justify-center min-h-screen">
			<div class="fixed inset-0 transition-opacity">
				<div class="modal-background absolute inset-0 bg-gray-500 opacity-50 no-scroll"></div>
			</div>
			<span class="hidden sm:(inline-block align-middle h-screen)"></span>
			<div class="inline-block align-bottom rounded-xl bg-white overflow-hidden shadow-xl transform transition-all relative">
				<button 
					class="absolute right-6 top-6 w-11 h-9 
					border border-slate-300 bg-white rounded-lg 
					flex items-center justify-center"
					onClick={onClose}
				>
					<IconX class="w-6 h-6" />
				</button>
				<div class="max-w-xs md:max-w-lg xl:max-w-2xl">
					<div 
						class="bg-[#E5DECF] px-8 py-5 md:px-10 
						md:py-8">
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
			</div>
      </div>
    </div>
  );
}

export default Modal;