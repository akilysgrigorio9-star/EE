# Pousada Altemar Dutra — site oficial

React 19 · TypeScript (strict) · Tailwind CSS 4 · Motion · React Three Fiber (apenas no hero, só em desktop com mouse).

## Como rodar

```bash
npm install
cp .env.example .env     # ajuste o número de WhatsApp e a URL do site
npm run dev              # desenvolvimento
npm run build            # tsc + build de produção (pasta dist/)
npm run preview          # testar o build
```

Requer Node 20+. Publique a pasta `dist/` em qualquer hospedagem estática (Netlify, Vercel, Cloudflare Pages…).

## Onde editar o conteúdo

Tudo fica em `src/config/site.ts`: telefones, endereço, quartos, passeios, galeria.
Itens com `provisional: true` aparecem com o selo **"a confirmar"** até o proprietário validar.

## Pendências do proprietário (nada foi inventado)

- Confirmar o número que recebe as solicitações (`VITE_WHATSAPP_NUMBER`). Padrão: (82) 98144-0618, o principal divulgado no Instagram.
- Confirmar endereço, quartos (camas, capacidade), comodidades, horário e cardápio do café, passeios e valores.
- Trocar as fotos em `public/photos/`. As atuais são recortes do print do Instagram, de baixa resolução, e servem só como provisórias.
- Definir domínio e preencher `VITE_SITE_URL`.

## Reservas

`src/lib/booking.ts` define a interface `BookingProvider`. Hoje o site usa `WhatsAppBookingProvider`:
valida os dados, mostra a revisão e abre o WhatsApp com a mensagem pronta. **Nunca** confirma reserva, preço ou disponibilidade.
Para integrar um motor real (disponibilidade, tarifas, pagamento), implemente `BookingProvider` chamando o backend do fornecedor
(chaves de API nunca no front-end) e troque o `bookingProvider` exportado.

## Desempenho e acessibilidade

- Cena 3D carregada sob demanda (lazy) e desligada em celulares, toque e "reduzir movimento".
- Efeitos de cursor (tilt 3D, paralaxe) só com mouse; `MotionConfig reducedMotion="user"`.
- Imagens com lazy-loading, placeholder e fallback; mapa em iframe lazy.
- Navegação por teclado, foco visível, link "pular para o conteúdo", diálogos com Esc, rótulos e erros anunciados (`role="alert"`).
