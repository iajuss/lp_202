"use client";

import { FormEvent, useMemo, useState } from "react";

type Fragrance = {
  name: string;
  image: string;
  tone: string;
  quizFamily: "fresh" | "floral" | "woody" | "amber";
  family: string;
  line: string;
  notes: string[];
  occasion: string;
  mood: string;
};

type Recommendation = {
  name: string;
  rationale: string;
};

const fragrances: Fragrance[] = [
  { name: "Royal Cypress", image: `${typeof window !== "undefined" && window.location.pathname.startsWith("/lp_202") ? "/lp_202" : ""}/images/royal-cypress.webp`, tone: "cypress", quizFamily: "woody", family: "Amadeirado verde", line: "Verde profundo, estrutura e clareza.", notes: ["cipreste", "cedro", "vetiver"], occasion: "Reuniões, primeiros encontros e dias que pedem firmeza.", mood: "Presença que se sustenta sem elevar a voz." },
  { name: "Soft Temptation", image: `${typeof window !== "undefined" && window.location.pathname.startsWith("/lp_202") ? "/lp_202" : ""}/images/soft-temptation.webp`, tone: "temptation", quizFamily: "amber", family: "Âmbar gourmand", line: "Calor discreto que se aproxima devagar.", notes: ["ameixa", "baunilha", "madeira"], occasion: "Noites, encontros e conversas que merecem ficar.", mood: "Sedução sem personagem." },
  { name: "Solar Breeze", image: `${typeof window !== "undefined" && window.location.pathname.startsWith("/lp_202") ? "/lp_202" : ""}/images/solar-breeze.webp`, tone: "solar", quizFamily: "fresh", family: "Cítrico solar", line: "Luz, pele e um começo sem esforço.", notes: ["bergamota", "neroli", "almíscar"], occasion: "Manhãs abertas, viagens e fins de semana ao sol.", mood: "Leveza que chega antes do sorriso." },
  { name: "Velvet Bloom", image: `${typeof window !== "undefined" && window.location.pathname.startsWith("/lp_202") ? "/lp_202" : ""}/images/velvet-bloom.webp`, tone: "velvet", quizFamily: "floral", family: "Floral aveludado", line: "Uma flor que não pede licença para existir.", notes: ["rosa", "pêssego", "sândalo"], occasion: "Almoços longos, celebrações e dias de se escolher.", mood: "Delicadeza com centro." },
  { name: "Ether Voyage", image: `${typeof window !== "undefined" && window.location.pathname.startsWith("/lp_202") ? "/lp_202" : ""}/images/ether-voyage.webp`, tone: "ether", quizFamily: "amber", family: "Âmbar especiado", line: "Profundidade dourada, feita para durar na memória.", notes: ["açafrão", "âmbar", "fava-tonca"], occasion: "Jantares, eventos e noites em que a chegada importa.", mood: "Um rastro que conta uma história inteira." },
  { name: "Noir Azure", image: `${typeof window !== "undefined" && window.location.pathname.startsWith("/lp_202") ? "/lp_202" : ""}/images/noir-azure.webp`, tone: "noir", quizFamily: "woody", family: "Aromático noturno", line: "Azul escuro, ar frio e precisão.", notes: ["lavanda", "incenso", "âmbar"], occasion: "Depois das 18h, cidade acesa e planos imprevistos.", mood: "Mistério claro, sem distância." },
  { name: "Oceanis", image: `${typeof window !== "undefined" && window.location.pathname.startsWith("/lp_202") ? "/lp_202" : ""}/images/oceanis.webp`, tone: "oceanis", quizFamily: "fresh", family: "Aquático mineral", line: "Ar livre com uma borda de sal.", notes: ["algas", "limão", "madeira clara"], occasion: "Dias quentes, movimento e aquela vontade de ir mais longe.", mood: "Frescor que não desaparece." },
];

const kitStages = [
  { title: "Kit confirmado", copy: "Você escolhe o kit de descoberta e inicia a sua jornada com os sete decants." },
  { title: "Em preparação", copy: "A AJA separa as sete fragrâncias e os briefings que acompanham cada experiência." },
  { title: "Em trânsito", copy: "O kit segue para você. A escolha começa quando as fragrâncias encontram a sua rotina." },
  { title: "Escolha final", copy: "Depois de avaliar os sete, você indica a fragrância que ficou e segue para o frasco original." },
];

const quizSteps = [
  { field: "mood", question: "Como você quer ser percebido agora?", options: [["firmeza", "Firmeza"], ["calor", "Calor"], ["mistério", "Mistério"], ["leveza", "Leveza"]] },
  { field: "moment", question: "Em que momento essa presença importa mais?", options: [["dia", "Durante o dia"], ["noite", "Depois das 18h"]] },
  { field: "intensity", question: "Que intensidade parece mais com você?", options: [["discreta", "Um rastro mais discreto"], ["marcante", "Uma assinatura marcante"]] },
  { field: "family", question: "Que direção olfativa mais te chama?", options: [["fresh", "Fresca e luminosa"], ["floral", "Floral e aveludada"], ["woody", "Amadeirada e verde"], ["amber", "Âmbar e envolvente"]] },
] as const;

const recommendationMap: Record<string, Recommendation> = {
  "firmeza|dia|discreta": { name: "Royal Cypress", rationale: "Estrutura verde para uma presença firme, mas medida, ao longo do dia." },
  "firmeza|dia|marcante": { name: "Ether Voyage", rationale: "Uma direção mais densa para quando firmeza também precisa deixar rastro." },
  "firmeza|noite|discreta": { name: "Noir Azure", rationale: "Precisão aromática para sustentar a noite sem disputar atenção." },
  "firmeza|noite|marcante": { name: "Royal Cypress", rationale: "Verde profundo e seguro para uma chegada de presença mais nítida." },
  "calor|dia|discreta": { name: "Solar Breeze", rationale: "Luminosidade cítrica para aproximar sem pesar." },
  "calor|dia|marcante": { name: "Velvet Bloom", rationale: "Uma leitura floral mais presente, feita para dias que pedem proximidade." },
  "calor|noite|discreta": { name: "Soft Temptation", rationale: "Calor contido, pensado para conversas que ficam." },
  "calor|noite|marcante": { name: "Soft Temptation", rationale: "Uma assinatura envolvente para encontros e noites mais longas." },
  "mistério|dia|discreta": { name: "Noir Azure", rationale: "Azul frio e refinado: um mistério que não se fecha." },
  "mistério|dia|marcante": { name: "Ether Voyage", rationale: "Âmbar e especiarias para uma presença de maior permanência." },
  "mistério|noite|discreta": { name: "Noir Azure", rationale: "Aromático e escuro na medida para planos imprevistos." },
  "mistério|noite|marcante": { name: "Ether Voyage", rationale: "Uma direção dourada para quando a chegada importa tanto quanto a conversa." },
  "leveza|dia|discreta": { name: "Oceanis", rationale: "Frescor mineral e aberto para acompanhar movimento e calor." },
  "leveza|dia|marcante": { name: "Solar Breeze", rationale: "Um brilho solar mais presente, ainda leve na pele." },
  "leveza|noite|discreta": { name: "Velvet Bloom", rationale: "Delicadeza com centro para uma noite mais próxima." },
  "leveza|noite|marcante": { name: "Oceanis", rationale: "Frescor definido para uma assinatura que segue em movimento." },
};

export default function Home() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ mood: "", moment: "", intensity: "", family: "" });
  const [quizContact, setQuizContact] = useState({ name: "", email: "", whatsapp: "", consent: false });
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackOccasion, setFeedbackOccasion] = useState("");
  const [selectedFragrance, setSelectedFragrance] = useState("");
  const [isScentMenuOpen, setIsScentMenuOpen] = useState(false);
  const [feedbackError, setFeedbackError] = useState(false);
  const [kitStage, setKitStage] = useState(0);
  const [chosenBottle, setChosenBottle] = useState("");
  const current = fragrances[active];
  const recommendation = useMemo(() => {
    const base = recommendationMap[`${answers.mood}|${answers.moment}|${answers.intensity}`];
    if (!base) return undefined;
    const familyMatch = fragrances.find((fragrance) => fragrance.name === base.name && fragrance.quizFamily === answers.family);
    const adjusted = familyMatch ?? fragrances.find((fragrance) => fragrance.quizFamily === answers.family) ?? fragrances.find((fragrance) => fragrance.name === base.name);
    if (!adjusted) return base;
    return adjusted.name === base.name ? base : { name: adjusted.name, rationale: `Intenção, momento, intensidade e a sua afinidade por uma direção ${adjusted.family.toLowerCase()} apontam para esta escolha.` };
  }, [answers]);
  const recommendedFragrance = useMemo(() => fragrances.find((fragrance) => fragrance.name === recommendation?.name), [recommendation]);

  function sendFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFragrance || !feedbackRating) {
      setFeedbackError(true);
      return;
    }
    setFeedbackError(false);
    setFeedbackSent(true);
    event.currentTarget.reset();
    setFeedbackRating(0);
    setFeedbackOccasion("");
    setSelectedFragrance("");
  }

  return (
    <main>
      <section className="hero" id="inicio">
        <nav className="nav" aria-label="Navegação principal">
          <a className="wordmark" href="#inicio" aria-label="AJA, início">AJA</a>
          <div className="nav-links">
            <a href="#marca">A marca</a>
            <a href="#colecao">Coleção</a>
            <a href="#experiencia">Experiência AJA</a>
            <a href="#meu-kit">Meu kit</a>
          </div>
          <a className="nav-cta" href="#quiz">Encontre o seu</a>
        </nav>
        <div className="hero-copy">
          <p className="eyebrow">Perfumaria de autoria · Vol. I</p>
          <h1>Seu cheiro<br /><em>vem antes</em> de você.</h1>
          <p className="hero-lede">A forma como você se apresenta não é acaso - é escolha. A AJA transforma o cheiro na parte mais intencional dessa escolha.</p>
          <div className="hero-actions">
            <a className="button button-terracotta" href="#colecao">Conheça a coleção <span>↘</span></a>
            <a className="text-link" href="#marca">A intenção é a ponte <span>↓</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <span className="sun-disc" />
          <div className="bottle-halo" />
          <img src={fragrances[4].image} alt="" />
          <p>Presença<br />intencional</p>
        </div>
        <div className="hero-footer"><span>Role para descobrir</span></div>
      </section>

      <section className="manifesto" id="marca">
        <div className="section-label">01 · A marca</div>
        <div className="manifesto-grid">
          <h2>Uma ideia simples<br /><span className="manifesto-middle">e desconfortavelmente</span><br /><em>verdadeira.</em></h2>
          <div className="manifesto-copy">
            <p className="large-copy">O perfume é a ponte entre o que os outros veem e o que você sente.</p>
            <p>Presença não é acaso. Quando você alinha o de dentro com o de fora, não veste um personagem: amplifica o que já é verdade.</p>
            <div className="principles">
              <div><span>Para fora</span><strong>Ser lembrado pelo que sustenta.</strong></div>
              <div><span>Para dentro</span><strong>Escolher uma presença que parece sua.</strong></div>
            </div>
          </div>
        </div>
        <div className="manifesto-quote">“A intencionalidade é a ponte.<br />O perfume é onde ela se torna tangível.”</div>
      </section>

      <section className="collection" id="colecao">
        <div className="section-heading">
          <div><p className="eyebrow">02 · A primeira coleção</p><h2>Escolha o que<br /><em>ele diz.</em></h2></div>
          <div><p>Sete maneiras de chegar inteiro. Nossas primeiras essências partem de grandes clássicos e encontram uma leitura AJA: direta, marcante e feita para o agora.</p><p className="collection-note">As direções olfativas desta demonstração serão consolidadas com as fichas oficiais de cada fragrância antes do lançamento.</p></div>
        </div>
        <div className="collection-showcase">
          <div className={`scent-stage ${current.tone}`}>
            <div className="stage-number">0{active + 1}</div>
            <img src={current.image} alt={`Frasco ${current.name}`} />
            <div className="stage-caption"><span>{current.family}</span><span>Eau de parfum · Vol. I</span></div>
          </div>
          <div className="scent-detail">
            <p className="eyebrow">{current.family}</p>
            <h3>{current.name}</h3>
            <p className="scent-line">{current.line}</p>
            <div className="notes"><span>Direção olfativa</span><p>{current.notes.join(" · ")}</p></div>
            <div className="notes"><span>Melhor em</span><p>{current.occasion}</p></div>
            <p className="mood">{current.mood}</p>
            <a className="button button-dark" href="#experiencia">Quero experimentar <span>↘</span></a>
          </div>
        </div>
        <div className="scent-tabs" aria-label="Escolha uma fragrância">
          {fragrances.map((fragrance, index) => <button className={index === active ? "active" : ""} onClick={() => setActive(index)} key={fragrance.name}><i style={{ backgroundImage: `url(${fragrance.image})` }} />{fragrance.name}</button>)}
        </div>
      </section>

      <section className="experience" id="experiencia">
        <div className="experience-intro"><p className="eyebrow">03 · Experiência AJA</p><h2>Você não escolhe<br />um perfume em <em>dois segundos.</em></h2><p>A escolha que fica pede tempo na pele, contexto e repertório. Por isso, a Experiência AJA começa antes do frasco original.</p></div>
        <div className="journey">
          <article><span>01</span><h3>Receba</h3><p>Seu kit chega com os sete decants da coleção: sete possibilidades para colocar em circulação.</p></article>
          <article><span>02</span><h3>Perceba</h3><p>Use cada fragrância no seu ritmo, com briefings de notas, ocasiões e contexto para cada uma delas.</p></article>
          <article><span>03</span><h3>Avalie</h3><p>Compare o que ficou na pele, o que combinou com seus dias e a presença que mais pareceu sua.</p></article>
          <article><span>04</span><h3>Escolha o frasco</h3><p>Ao final, conte qual das sete essências te encontrou e receba o frasco original da sua escolha.</p></article>
        </div>
        <div className="experience-card"><div><p className="eyebrow">Seu kit de descoberta</p><h3>7 decants.<br />Você sente.<br /><em>Você escolhe o seu.</em></h3><p className="experience-card-copy">A experiência termina com o frasco original da fragrância que ficou em você.</p></div><a className="button button-terracotta" href="#meu-kit">Ver meu kit <span>↘</span></a></div>
      </section>

      <section className="kit-dashboard" id="meu-kit">
        <div className="kit-heading"><div><p className="eyebrow">03.1 · Meu kit</p><h2>Uma escolha que<br />ganha <em>história.</em></h2></div><p>Um esboço da jornada que acompanhará o cliente do kit de descoberta ao frasco original. As etapas abaixo são uma visão de interface: pagamento, entrega e dados reais entram com o backend.</p></div>
        <div className="kit-progress" aria-label="Etapas da experiência do kit">{kitStages.map((stage, index) => <button type="button" className={index <= kitStage ? "active" : ""} aria-pressed={index === kitStage} key={stage.title} onClick={() => setKitStage(index)}><span>0{index + 1}</span><strong>{stage.title}</strong></button>)}</div>
        <div className="kit-stage-copy"><p className="eyebrow">Etapa {kitStage + 1} de {kitStages.length}</p><h3>{kitStages[kitStage].title}</h3><p>{kitStages[kitStage].copy}</p></div>
        <div className="kit-fragrances"><div><p className="eyebrow">Seus 7 decants</p><h3>Briefing, contexto e<br /><em>percepção.</em></h3></div><p>Durante a experiência, cada fragrância ganha uma leitura própria — e cada avaliação ajuda a tornar a escolha mais consciente.</p></div>
        <div className="kit-grid">{fragrances.map((fragrance, index) => <article key={fragrance.name}><img src={fragrance.image} alt={`Frasco ${fragrance.name}`} /><div><span>0{index + 1} · {fragrance.family}</span><h3>{fragrance.name}</h3><p>{fragrance.occasion}</p><div><a href="#colecao" onClick={() => setActive(index)}>Ver briefing <b>↘</b></a><a href="#feedback" onClick={() => setSelectedFragrance(fragrance.name)}>Avaliar <b>↘</b></a></div></div></article>)}</div>
        <div className="bottle-choice"><div><p className="eyebrow">Depois de sentir</p><h3>Qual das sete<br />ficou <em>em você?</em></h3><p>Quando a experiência estiver integrada, esta é a escolha que direcionará o frasco original.</p></div><div className="bottle-options" aria-label="Escolha do frasco original">{fragrances.map((fragrance) => <button type="button" className={chosenBottle === fragrance.name ? "selected" : ""} aria-pressed={chosenBottle === fragrance.name} key={fragrance.name} onClick={() => setChosenBottle(fragrance.name)}>{fragrance.name}<span>↘</span></button>)}{chosenBottle && <p>Você escolheu <strong>{chosenBottle}</strong> como seu frasco original.</p>}</div></div>
      </section>

      <section className="quiz-section" id="quiz">
        <div className="quiz-copy"><p className="eyebrow">04 · Curadoria pessoal</p><h2>Qual presença<br />você quer <em>deixar?</em></h2><p>Conte o que procura. Nós cruzamos intenção, ocasião e intensidade para indicar uma primeira direção - e, se quiser, desenhar a continuação dessa conversa.</p></div>
        <div className="quiz-card">
          {step < quizSteps.length && <><div className="quiz-progress"><span>0{step + 1} / 0{quizSteps.length}</span><i style={{ width: `${((step + 1) / quizSteps.length) * 100}%` }} /></div><p className="quiz-question">{quizSteps[step].question}</p><div className="answer-grid">{quizSteps[step].options.map(([value, label]) => <button type="button" key={value} onClick={() => { setAnswers((last) => ({ ...last, [quizSteps[step].field]: value })); setStep((last) => last + 1); }}>{label}<span>↗</span></button>)}</div></>}
          {step === quizSteps.length && <form className="quiz-contact" onSubmit={(event) => { event.preventDefault(); setStep(quizSteps.length + 1); }}><div className="quiz-progress"><span>Seu contato é opcional</span><i style={{ width: "100%" }} /></div><p className="quiz-question">Quer uma curadoria<br />que continue <em>depois daqui?</em></p><p>Deixe seus dados se quiser que a AJA entre em contato com uma seleção mais pessoal, baseada nas suas respostas.</p><div className="quiz-contact-fields"><input value={quizContact.name} onChange={(event) => setQuizContact((last) => ({ ...last, name: event.target.value }))} placeholder="Seu nome" /><input value={quizContact.email} onChange={(event) => setQuizContact((last) => ({ ...last, email: event.target.value }))} type="email" placeholder="Seu e-mail" required={quizContact.consent} /><input value={quizContact.whatsapp} onChange={(event) => setQuizContact((last) => ({ ...last, whatsapp: event.target.value }))} placeholder="WhatsApp (opcional)" /></div><label className="quiz-consent"><input type="checkbox" checked={quizContact.consent} onChange={(event) => setQuizContact((last) => ({ ...last, consent: event.target.checked }))} /> <span>Quero receber uma curadoria da AJA com base nas minhas respostas.</span></label><p className="prototype-note">Protótipo de fluxo: estes dados não são enviados nesta demonstração.</p><button className="button button-dark" type="submit">Ver minha direção <span>↗</span></button></form>}
          {step === quizSteps.length + 1 && recommendation && <div className="quiz-result"><p className="eyebrow">Sua primeira direção</p><img src={recommendedFragrance?.image} alt="" /><h3>{recommendation.name}</h3><p>{recommendation.rationale}</p>{quizContact.consent && <p className="quiz-followup">Seu interesse em continuar a conversa foi marcado nesta demonstração. A integração com a curadoria será ativada antes do lançamento.</p>}<button type="button" className="text-link" onClick={() => { setStep(0); setAnswers({ mood: "", moment: "", intensity: "", family: "" }); setQuizContact({ name: "", email: "", whatsapp: "", consent: false }); }}>Refazer a escolha ↺</button></div>}
        </div>
      </section>

      <section className="feedback" id="feedback">
        <div><p className="eyebrow">05 · A conversa continua</p><h2>O que ficou<br />em você?</h2><p>Experiência se constrói junto. Conte como uma AJA se encontrou com a sua pele, seu dia e suas memórias.</p><p className="prototype-note">Esta é uma demonstração do canal de escuta. O envio à equipe será integrado antes da publicação.</p></div>
        <form onSubmit={sendFeedback}>
          <div className="scent-select-wrap">
            <span className="field-label">Qual fragrância te acompanhou?</span>
            <button className={`scent-select ${isScentMenuOpen ? "is-open" : ""}`} type="button" aria-haspopup="listbox" aria-expanded={isScentMenuOpen} aria-label="Escolha uma essência" onClick={() => setIsScentMenuOpen((open) => !open)}>{selectedFragrance || "Escolha uma essência"}<span>⌄</span></button>
            {isScentMenuOpen && <div className="scent-options" role="listbox" aria-label="Fragrâncias AJA">{fragrances.map((item) => <button role="option" aria-selected={selectedFragrance === item.name} type="button" key={item.name} onClick={() => { setSelectedFragrance(item.name); setIsScentMenuOpen(false); setFeedbackError(false); }}>{item.name}<small>{item.family}</small></button>)}</div>}
            {feedbackError && <p className="field-error">Escolha a essência que te acompanhou e atribua uma nota.</p>}
          </div>
          <div className="rating-field"><span className="field-label">Sua nota</span><div role="group" aria-label="Nota da fragrância">{[1, 2, 3, 4, 5].map((rating) => <button type="button" className={feedbackRating >= rating ? "active" : ""} aria-pressed={feedbackRating === rating} key={rating} onClick={() => { setFeedbackRating(rating); setFeedbackError(false); }}>{rating}</button>)}</div></div>
          <label>Em qual ocasião ela te acompanhou?<input value={feedbackOccasion} onChange={(event) => setFeedbackOccasion(event.target.value)} required placeholder="Trabalho, encontro, dia a dia..." /></label>
          <label>O que ela disse sobre você?<textarea required placeholder="Uma impressão, uma memória, um momento..." rows={4} /></label>
          <div className="form-row"><label>Seu nome<input required placeholder="Como podemos te chamar?" /></label><label>Seu e-mail<input required type="email" placeholder="seu@email.com" /></label></div>
          <button className="button button-dark" type="submit">Enviar minha percepção <span>↗</span></button>{feedbackSent && <p className="form-success">Percepção registrada nesta demonstração. A integração de envio será ativada antes do lançamento.</p>}
        </form>
      </section>

      <footer><a className="wordmark" href="#inicio">AJA</a><p>Presença intencional.</p><p>Seu cheiro vem antes de você.</p><a href="#inicio">AJA com intenção ↑</a></footer>
    </main>
  );
}
