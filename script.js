document.addEventListener('DOMContentLoaded', () => {
  const formAgendamento = document.getElementById('form-agendamento');

  formAgendamento.addEventListener('submit', (event) => {
    event.preventDefault();

    // Captura e sanitização básica dos valores dos campos
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const servico = document.getElementById('servico').value;
    const dataInput = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    // Formatação de data (AAAA-MM-DD para DD/MM/AAAA)
    const [ano, mes, dia] = dataInput.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // Número de destino (substitua pelo número da barbearia se desejar)
    const numeroWhatsApp = '5543999999999';

    // Montagem do texto estruturado para envio
    const mensagem = 
      `*Novo Agendamento - Barbearia Navalha de Ouro*\n\n` +
      `👤 *Cliente:* ${nome}\n` +
      `📞 *Contato:* ${telefone}\n` +
      `✂️ *Serviço:* ${servico}\n` +
      `📅 *Data:* ${dataFormatada}\n` +
      `⏰ *Horário:* ${hora}\n\n` +
      `_Mensagem enviada automaticamente via site._`;

    // Codificação de caracteres especiais para URL
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    // Redirecionamento em nova aba
    window.open(urlWhatsApp, '_blank');
  });
});