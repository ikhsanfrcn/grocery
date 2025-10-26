import { Product } from "../interface/type";


export type CartLine = { product: Product; qty: number };

export function createWhatsAppMessage(lines: CartLine[]): string {
  const header = "Halo, saya ingin memesan:\n";
  const items = lines.map(l => {
    const title = l.product.title;
    const price = l.product.price;
    const subtotal = l.qty * price;
    return `- ${title} x${l.qty} = $${subtotal.toFixed(2)}`;
  }).join("\n");
  const total = lines.reduce((s, l) => s + l.qty * l.product.price, 0);
  const foot = `\nTotal = $${total.toFixed(2)}\n\nMohon info ketersediaan dan estimasi pengiriman. Terima kasih.`;
  return encodeURIComponent(header + items + foot);
}

export function whatsappUrl(lines: CartLine[]): string {
  const msg = createWhatsAppMessage(lines);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return `https://wa.me/${phone}?text=${msg}`;
}

