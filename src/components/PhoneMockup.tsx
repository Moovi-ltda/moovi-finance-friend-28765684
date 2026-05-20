import { Check, Bell, Send, User } from "lucide-react";

export const PhoneMockup = () => (
  <div className="relative mx-auto mt-8 md:mt-0 w-full max-w-[360px]">
    {/* Floating Chips */}
    <div className="absolute left-[-20px] top-[22%] z-10 flex items-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm font-semibold shadow-xl">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-moovi-green/10 text-moovi-green">
        <Check size={16} />
      </div>
      <span>Gasto registrado</span>
    </div>
    <div className="absolute right-[-20px] top-[56%] z-10 flex items-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm font-semibold shadow-xl">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
        <Bell size={16} />
      </div>
      <span>Alerta de limite</span>
    </div>

    {/* Phone Frame */}
    <div className="relative rounded-[40px] bg-[#1F2C24] p-3 shadow-2xl shadow-moovi-green/20 ring-1 ring-white/5">
      <div className="relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-[32px] bg-[#ECE5DD]">
        {/* Notch */}
        <div className="absolute left-1/2 top-1.5 z-20 h-6 w-[110px] -translate-x-1/2 rounded-[14px] bg-[#1F2C24]" />

        {/* WhatsApp Header */}
        <div className="flex items-center gap-3 bg-[#075E54] px-4 pb-3 pt-8 text-white">
          <span className="text-xl opacity-90">‹</span>
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-white p-1">
            <img src="/moovi-pig.png" alt="Moovi" className="h-full w-full object-contain" />
          </div>
          <div className="flex-1 leading-tight">
            <div className="font-semibold">Moovi</div>
            <div className="text-xs opacity-85">online</div>
          </div>
          <div className="flex gap-4 opacity-85">
            <span>📞</span>
            <span>⋮</span>
          </div>
        </div>

        {/* WhatsApp Body */}
        <div className="flex flex-1 flex-col gap-2 overflow-hidden bg-[#ECE5DD] px-3 py-4 text-sm" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent 0 12px, rgba(0,0,0,0.012) 12px 13px), repeating-linear-gradient(90deg, transparent 0 12px, rgba(0,0,0,0.012) 12px 13px)`
        }}>
          {/* Outbound Bubble */}
          <div className="relative max-w-[85%] self-end rounded-xl rounded-tr-sm bg-[#DCF8C6] px-3 pb-1.5 pt-2 text-gray-800 shadow-sm">
            Gastei <span className="font-bold text-red-600">R$ 47,90</span> no mercado agora <span className="hidden">🚀</span>
            <div className="mt-0.5 text-right text-[10px] font-medium text-gray-500">
              14:32 <span className="text-[#34B7F1] ml-0.5">✓✓</span>
            </div>
          </div>

          {/* Inbound Bubble */}
          <div className="relative max-w-[85%] self-start rounded-xl rounded-tl-sm bg-white px-3 pb-1.5 pt-2 text-gray-800 shadow-sm">
            Anotado! ✅<br />
            Categoria: <strong className="font-semibold">Alimentação</strong>
            
            <div className="mt-2 rounded-lg border border-gray-100 bg-white p-2.5">
              <div className="mb-1 text-[13px] font-bold text-moovi-green">Mercado · maio</div>
              <div className="flex items-center justify-between py-1 text-[12px]">
                <span className="text-gray-500">R$ 387 / R$ 600</span>
                <span className="font-bold text-moovi-green">64%</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[64%] rounded-full bg-moovi-green" />
              </div>
            </div>
            
            <div className="mt-0.5 text-right text-[10px] font-medium text-gray-400">14:32</div>
          </div>

          {/* Outbound Bubble */}
          <div className="relative max-w-[85%] self-end rounded-xl rounded-tr-sm bg-[#DCF8C6] px-3 pb-1.5 pt-2 text-gray-800 shadow-sm">
            quanto ainda posso gastar com lazer esse mês?
            <div className="mt-0.5 text-right text-[10px] font-medium text-gray-500">
              14:33 <span className="text-[#34B7F1] ml-0.5">✓✓</span>
            </div>
          </div>

          {/* Inbound Bubble */}
          <div className="relative max-w-[85%] self-start rounded-xl rounded-tl-sm bg-white px-3 pb-1.5 pt-2 text-gray-800 shadow-sm">
            Você tem <span className="font-bold text-moovi-green">R$ 142,30</span> de saldo em <strong className="font-semibold">Lazer</strong> até dia 31. 💚
            <div className="mt-0.5 text-right text-[10px] font-medium text-gray-400">14:33</div>
          </div>
        </div>

        {/* WhatsApp Input */}
        <div className="m-2 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-gray-500 shadow-sm">
          <span>😊</span>
          <span className="flex-1 text-[14px]">Mensagem</span>
          <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-moovi-whatsapp text-white">
            <Send size={14} className="ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
