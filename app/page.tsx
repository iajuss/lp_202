"use client";

import { FormEvent, useMemo, useState } from "react";

type Fragrance = {
  name: string;
  image: string;
  tone: string;
  family: string;
  line: string;
  notes: string[];
  occasion: string;
  mood: string;
};

const fragrances: Fragrance[] = [
  { name: "Royal Cypress", image: "/images/royal-cypress.webp", tone: "cypress", family: "Amadeirado verde", line: "Verde profundo, estrutura e clareza.", notes: ["cipreste", "cedro", "vetiver"], occasion: "Reuniões, primeiros encontros e dias que pedem firmeza.", mood: "Presença que se sustenta sem elevar a voz." },
  { name: "Soft Temptation", image: "/images/soft-temptation.webp", tone: "temptation", family: "Âmbar gourmand", line: "Calor discreto que se aproxima devagar.", notes: ["ameixa", "baunilha", "madeira"], occasion: "Noites, encontros e conversas que merecem ficar.", mood: "Sedução sem personagem." },
  { name: "Solar Breeze", image: "/images/solar-breeze.webp", tone: "solar", family: "Cítrico solar", line: "Luz, pele e um começo sem esforço.", notes: ["bergamota", "neroli", "almíscar"], occasion: "Manhãs abertas, viagens e fins de semana ao sol.", mood: "Leveza que chega antes do sorriso." },
  { name: "Velvet Bloom", image: "/images/velvet-bloom.webp", tone: "velvet", family: "Floral aveludado", line: "Uma flor que não pede licença para existir.", notes: ["rosa", "pêssego", "sândalo"], occasion: "Almoços longos, celebrações e dias de se escolher.", mood: "Delicadeza com centro." },
  { name: "Ether Voyage", image: "/images/ether-voyage.webp", tone: "ether", family: "Âmbar especiado", line: "Profundidade dourada, feita para durar na memória.", notes: ["açafrão", "âmbar", "fava-tonca"], occasion: "Jantares, eventos e noites em que a chegada importa.", mood: "Um rastro que conta uma história inteira." },
  { name: "Noir Azure", image: "/images/noir-azure.webp", tone: "noir", family: "Aromático noturno", line: "Azul escuro, ar frio e precisão.", notes: ["lavanda", "incenso", "âmbar"], occasion: "Depois das 18h, cidade acesa e planos imprevistos.", mood: "Mistério claro, sem distância." },
  { name: "Oceanis", image: "/images/oceanis.webp", tone: "oceanis", family: "Aquático mineral", line: "Ar livre com uma borda de sal.", notes: ["algas", "limão", "madeira clara"], occasion: "Dias quentes, movimento e aquela vontade de ir mais longe.", mood: "Frescor que não desaparece." },
];

const recommendationMap: Record<string, string> = {
  "firmeza|dia": "Royal Cypress",
  "firmeza|noite": "Noir Azure",
  "calor|dia": "Solar Breeze",
  "calor|noite": "Soft Temptation",
  "mistério|dia": "Ether Voyage",
  "mistério|noite": "Noir Azure",
  "leveza|dia": "Oceanis",
  "leveza|noite": "Velvet Bloom",
};

export default function Home() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ mood: "", moment: "", intensity: "" });
  const [quizContact, setQuizContact] = useState({ name: "", email: "", whatsapp: "", consent: false });
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [selectedFragrance, setSelectedFragrance] = useState("");
  const [isScentMenuOpen, setIsScentMenuOpen] = useState(false);
  const [feedbackError, setFeedbackError] = useState(false);
  const current = fragrances[active];
  const recommendation = useMemo(() => recommendationMap[`${answers.mood}|${answers.moment}`], [answers]);

  function sendFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFragrance) {
      setFeedbackError(true);
      return;
    }
    setFeedbackError(false);
    setFeedbackSent(true);
    event.currentTarget.reset();
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
          <img src="/images/ether-voyage.webp" alt="" />
          <p>Presença<br />intencional</p>
        </div>
        <div className="hero-footer"><span>Role para descobrir</span><span>01 / 05</span></div>
      </section>

      <section className="manifesto" id="marca">
        <div className="section-label">01 · A marca</div>
        <div className="manifesto-grid">
          <h2>Uma ideia simples<br />e desconfortavelmente<br /><em>verdadeira.</em></h2>
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
          <p>Sete maneiras de chegar inteiro. Nossas primeiras essências partem de grandes clássicos e encontram uma leitura AJA: direta, marcante e feita para o agora.</p>
        </div>
        <div className="collection-showcase">
          <div className={`scent-stage ${current.tone}`}>
            <div className="stage-number">0{active + 1}</div>
            <img src={current.image} alt={`Frasco ${current.name}`} />
            <div className="stage-caption"><span>{current.family}</span><span>50 ml · EDP</span></div>
          </div>
          <div className="scent-detail">
            <p className="eyebrow">{current.family}</p>
            <h3>{current.name}</h3>
            <p className="scent-line">{current.line}</p>
            <div className="notes"><span>Notas</span><p>{current.notes.join(" · ")}</p></div>
            <div className="notes"><span>Melhor em</span><p>{current.occasion}</p></div>
            <p className="mood">{current.mood}</p>
            <button className="button button-dark" type="button" onClick={() => document.querySelector("#experiencia")?.scrollIntoView({ behavior: "smooth" })}>Quero experimentar <span>↘</span></button>
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
        <div className="experience-card"><div><p className="eyebrow">Seu kit de descoberta</p><h3>7 decants.<br />Você sente.<br /><em>Você escolhe o seu.</em></h3><p className="experience-card-copy">A experiência termina com o frasco original da fragrância que ficou em você.</p></div><a className="button button-terracotta" href="#quiz">Começar por mim <span>↘</span></a></div>
      </section>

      <section className="quiz-section" id="quiz">
        <div className="quiz-copy"><p className="eyebrow">04 · Curadoria pessoal</p><h2>Qual presença<br />você quer <em>deixar?</em></h2><p>Conte o que procura. Nós cruzamos intenção, ocasião e intensidade para indicar sua primeira direção - e, se quiser, continuar a conversa com você.</p></div>
        <div className="quiz-card">
          {step < 3 && <><div className="quiz-progress"><span>0{step + 1} / 03</span><i style={{ width: `${(step + 1) * 33.33}%` }} /></div><p className="quiz-question">{step === 0 ? "Como você quer ser percebido agora?" : step === 1 ? "Em que momento essa presença importa mais?" : "Que intensidade parece mais com você?"}</p><div className="answer-grid">{(step === 0 ? [["firmeza", "Firmeza"], ["calor", "Calor"], ["mistério", "Mistério"], ["leveza", "Leveza"]] : step === 1 ? [["dia", "Durante o dia"], ["noite", "Depois das 18h"]] : [["discreta", "Um rastro mais discreto"], ["marcante", "Uma assinatura marcante"]]).map(([value, label]) => <button type="button" key={value} onClick={() => { const field = step === 0 ? "mood" : step === 1 ? "moment" : "intensity"; setAnswers((last) => ({ ...last, [field]: value })); setStep((last) => last + 1); }}>{label}<span>↗</span></button>)}</div></>}
          {step === 3 && <form className="quiz-contact" onSubmit={(event) => { event.preventDefault(); setStep(4); }}><div className="quiz-progress"><span>Seu contato é opcional</span><i style={{ width: "100%" }} /></div><p className="quiz-question">Quer uma curadoria<br />que continue <em>depois daqui?</em></p><p>Deixe seus dados se quiser que a AJA entre em contato com uma seleção mais pessoal, baseada nas suas respostas.</p><div className="quiz-contact-fields"><input value={quizContact.name} onChange={(event) => setQuizContact((last) => ({ ...last, name: event.target.value }))} placeholder="Seu nome" /><input value={quizContact.email} onChange={(event) => setQuizContact((last) => ({ ...last, email: event.target.value }))} type="email" placeholder="Seu e-mail" required={quizContact.consent} /><input value={quizContact.whatsapp} onChange={(event) => setQuizContact((last) => ({ ...last, whatsapp: event.target.value }))} placeholder="WhatsApp (opcional)" /></div><label className="quiz-consent"><input type="checkbox" checked={quizContact.consent} onChange={(event) => setQuizContact((last) => ({ ...last, consent: event.target.checked }))} /> <span>Quero receber uma curadoria da AJA com base nas minhas respostas.</span></label><button className="button button-dark" type="submit">Ver minha direção <span>↗</span></button></form>}
          {step === 4 && recommendation && <div className="quiz-result"><p className="eyebrow">Sua primeira direção</p><img src={fragrances.find((x) => x.name === recommendation)?.image} alt="" /><h3>{recommendation}</h3><p>{fragrances.find((x) => x.name === recommendation)?.mood}</p>{quizContact.consent && <p className="quiz-followup">A AJA recebeu seu pedido de curadoria. Em breve, esta conversa continua.</p>}<button type="button" className="text-link" onClick={() => { setStep(0); setAnswers({ mood: "", moment: "", intensity: "" }); setQuizContact({ name: "", email: "", whatsapp: "", consent: false }); }}>Refazer a escolha ↺</button></div>}
        </div>
      </section>

      <section className="feedback" id="feedback">
        <div><p className="eyebrow">05 · A conversa continua</p><h2>O que ficou<br />em você?</h2><p>Experiência se constrói junto. Conte como uma AJA se encontrou com a sua pele, seu dia e suas memórias.</p></div>
        <form onSubmit={sendFeedback}>
          <div className="scent-select-wrap">
            <span className="field-label">Qual fragrância te acompanhou?</span>
            <button className={`scent-select ${isScentMenuOpen ? "is-open" : ""}`} type="button" aria-haspopup="listbox" aria-expanded={isScentMenuOpen} aria-label="Escolha uma essência" onClick={() => setIsScentMenuOpen((open) => !open)}>{selectedFragrance || "Escolha uma essência"}<span>⌄</span></button>
            {isScentMenuOpen && <div className="scent-options" role="listbox" aria-label="Fragrâncias AJA">{fragrances.map((item) => <button role="option" aria-selected={selectedFragrance === item.name} type="button" key={item.name} onClick={() => { setSelectedFragrance(item.name); setIsScentMenuOpen(false); setFeedbackError(false); }}>{item.name}<small>{item.family}</small></button>)}</div>}
            {feedbackError && <p className="field-error">Escolha a essência que te acompanhou.</p>}
          </div>
          <label>O que ela disse sobre você?<textarea required placeholder="Uma impressão, uma memória, um momento..." rows={4} /></label>
          <div className="form-row"><label>Seu nome<input required placeholder="Como podemos te chamar?" /></label><label>Seu e-mail<input required type="email" placeholder="seu@email.com" /></label></div>
          <button className="button button-dark" type="submit">Enviar minha percepção <span>↗</span></button>{feedbackSent && <p className="form-success">Recebemos sua percepção. Obrigado por agir com intenção.</p>}
        </form>
      </section>

      <footer><a className="wordmark" href="#inicio">AJA</a><p>Presença intencional.</p><p>Seu cheiro vem antes de você.</p><a href="#inicio">Voltar ao início ↑</a></footer>
    </main>
  );
}
