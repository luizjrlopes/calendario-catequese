📄 agente-impressao-calendario.md
🧠 Objetivo
Implementar uma estrutura de impressão A4 com layout de calendário fiel ao modelo visual fornecido. Cada página A4 deve conter três meses lado a lado, com todos os estilos, cores e elementos idênticos à imagem referência. Essa estrutura será usada para gerar visualizações HTML que serão impressas em papel.

🧩 Estrutura Visual
Cada mês deve seguir o seguinte layout:

🟥 Cabeçalho
Faixa horizontal vermelha com:

MÊS em caixa alta à esquerda (AGOSTO)

ANO à direita (2025)

Linha de dias da semana:

Domingos (D) em vermelho com fundo branco

Dias úteis com fundo cinza e texto branco

📆 Grade do mês
Dias da semana em 7 colunas (D a S)

Números dos dias:

Domingos em vermelho

Dias com evento também em vermelho

Dias comuns em preto

O mês deve iniciar no dia correto da semana e preencher até o final do mês (ajustar colunas)

📋 Lista de eventos do mês
Exibir eventos abaixo da grade do mês

Formato:

markdown
Copiar
Editar
05 - Encontro de Catequistas  
08 - Encontro da Semana da Família  
     (Pais, Catequizandos e Pastoral Familiar)
12 - Filme: Irmão Sol, Irmã Lua
O número do dia deve ser vermelho

O texto dos eventos em preto

Subtítulos menores e indentados

🌙 Fases da Lua
Exibir símbolos e datas no rodapé:

◯ (Crescente), ● (Cheia), ◑ (Minguante), ○ (Nova)

Exemplo:

Copiar
Editar
◯ 01/31 CRESC   ● 09 CHEIA   ◑ 16 MING   ○ 23 NOVA
🖨️ Layout para Impressão
Página A4 (formato paisagem)
Três colunas por folha (1 mês por coluna)

Margens mínimas para impressão

Cada mês ocupa 1/3 da largura da página

Fonte legível para impressão (ex: Arial, sans-serif)

🔧 Dados necessários por mês
json
Copiar
Editar
{
  "mes": "agosto",
  "ano": 2025,
  "eventos": [
    { "dia": 5, "titulo": "Encontro de Catequistas" },
    { "dia": 8, "titulo": "Encontro da Semana da Família", "subtitulo": "Pais, Catequizandos e Pastoral Familiar" },
    { "dia": 12, "titulo": "Filme: Irmão Sol, Irmã Lua" },
    { "dia": 13, "titulo": "Filme: Versão atualizada infantil" },
    { "dia": 14, "titulo": "Visita a uma família" },
    { "dia": 24, "titulo": "Missa Catequética (Crisma)" },
    { "dia": 31, "titulo": "Missa Dia do Catequista" }
  ],
  "fasesLua": {
    "01": "CRESC",
    "09": "CHEIA",
    "16": "MING",
    "23": "NOVA",
    "31": "CRESC"
  }
}
📌 Requisitos Técnicos
 Renderizar dinamicamente qualquer mês e ano

 Aceitar uma lista de eventos com dia, título e subtítulo

 Destacar visualmente os dias com eventos (em vermelho)

 Gerar layout responsivo para impressão em A4 paisagem

 Incluir ícones das fases da lua no rodapé

 Estilos fixos compatíveis com impressora (cores visíveis no papel)

🛠 Sugestões técnicas
Linguagem: HTML + CSS (sem frameworks)

Fonte: Arial, Helvetica, sans-serif

Tamanho ideal de fonte: entre 10pt e 14pt

Usar @media print para ajustar a visualização de impressão

Aplicar page-break-after: always; a cada três meses para forçar quebra de página