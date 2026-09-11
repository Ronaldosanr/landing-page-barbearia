document.addEventListener('DOMContentLoaded', () => {
  const formAgendamento = document.getElementById('form-agendamento');

  formAgendamento.addEventListener('submit', (event) => {
    event.preventDefault();

    // Captura e sanitizacao basica dos valores dos campos
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const servico = document.getElementById('servico').value;
    const dataInput = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    // Formatacao de data (AAAA-MM-DD para DD/MM/AAAA)
    const [ano, mes, dia] = dataInput.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // ==========================================================================
    // DEFINICAO DO DESTINATARIO
    // - Modo Demonstrativo (Ativo): Envia para o telefone preenchido no teste.
    // - Modo Producao: Descomente a linha abaixo com o numero fixo da barbearia.
    // ==========================================================================
    // const destino = '5543999999999'; // Ex: '55' + DDD + Numero do estabelecimento

    const telefoneLimpo = telefone.replace(/\D/g, '');
    const destino = telefoneLimpo.startsWith('55') ? telefoneLimpo : `55${telefoneLimpo}`;

    // Montagem usando escape Unicode (100% compativel com charset em qualquer OS)
    const mensagem = [
      '\u{1F488} *Novo Agendamento - Barbearia Navalha de Ouro*',
      '',
      `\u{1F464} *Cliente:* ${nome}`,
      `\u{1F4F1} *Contato:* ${telefone}`,
      `\u{2702}\u{FE0F} *Serviço:* ${servico}`,
      `\u{1F4C5} *Data:* ${dataFormatada}`,
      `\u{23F0} *Horário:* ${hora}`,
      '',
      '\u{1F4AC} _Mensagem enviada automaticamente via site._'
    ].join('\n');

    // URL via api.whatsapp.com com encoding correto
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${destino}&text=${encodeURIComponent(mensagem)}`;

    // Redirecionamento direto
    window.location.href = urlWhatsApp;
  });
});