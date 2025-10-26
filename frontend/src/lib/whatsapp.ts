import { CartLine } from "../context/cart";

interface WhatsAppOptions {
  lines: CartLine[];
  address?: string;
  detail?: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

export function createWhatsAppMessage({ lines, address, detail }: WhatsAppOptions): string {
  const header = "*PESANAN GROSIR*\n\nHalo, saya ingin memesan:\n\n";

  const items = lines
    .map((l, idx) => {
      const title = l.product.title;
      const variantName = l.variant.name;
      const sku = l.variant.sku;
      const unitPrice = formatCurrency(l.variant.price);
      const subtotal = formatCurrency(l.qty * l.variant.price);
      
      return `${idx + 1}. *${title}*\n   Variant: ${variantName}\n   SKU: ${sku}\n   ${unitPrice} x ${l.qty} = ${subtotal}`;
    })
    .join("\n\n");

  const totalQty = lines.reduce((s, l) => s + l.qty, 0);
  const totalAmount = lines.reduce((s, l) => s + l.qty * l.variant.price, 0);

  const summary = `\n\n*RINGKASAN PESANAN*\nTotal Item: ${totalQty} pcs\nTotal Harga: ${formatCurrency(totalAmount)}`;

  const addressText = address ? `\n\n*ALAMAT PENGIRIMAN*\n${address}${detail ? `\nCatatan: ${detail}` : ""}` : "";

  const footer = `\n\nMohon konfirmasi ketersediaan stok dan estimasi pengiriman.\n\nTerima kasih!`;

  return encodeURIComponent(header + items + summary + addressText + footer);
}

export function whatsappUrl({ lines, address, detail }: WhatsAppOptions): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const msg = createWhatsAppMessage({ lines, address, detail });
  if (phone) return `https://wa.me/${phone}?text=${msg}`;
  return `https://wa.me/?text=${msg}`;
}