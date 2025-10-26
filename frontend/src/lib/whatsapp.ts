import { CartLine } from "../context/cart";

interface WhatsAppOptions {
  lines: CartLine[];
  address?: string;
  detail?: string;
}

export function createWhatsAppMessage({ lines, address, detail }: WhatsAppOptions): string {
  const header = "Halo, saya ingin memesan:\n\n";

  const items = lines
    .map((l, idx) => {
      const title = l.product.title;
      const variantName = l.variant.name;
      const sku = l.variant.sku;
      const subtotal = l.qty * l.variant.price;
      return `${idx + 1}. ${title} (${variantName}) [${sku}] x${l.qty} = $${subtotal.toFixed(2)}`;
    })
    .join("\n");

  const total = lines.reduce((s, l) => s + l.qty * l.variant.price, 0);

  const addressText = address ? `\n\nAlamat pengiriman:\n${address}${detail ? `, (${detail})` : ""}` : "";

  const foot = `\n\nTotal = $${total.toFixed(2)}${addressText}\n\nMohon info ketersediaan dan estimasi pengiriman. Terima kasih.`;

  return encodeURIComponent(header + items + foot);
}

export function whatsappUrl({ lines, address, detail }: WhatsAppOptions): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const msg = createWhatsAppMessage({ lines, address, detail });
  if (phone) return `https://wa.me/${phone}?text=${msg}`;
  return `https://wa.me/?text=${msg}`;
}
