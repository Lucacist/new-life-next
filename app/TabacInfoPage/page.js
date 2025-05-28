"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

export default function TabacInfoPage() {
  return (
    <div className="tabacinfopage">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Tout savoir sur le tabac</h1>
        <p className="text-gray-600 mt-2">Comprendre, c’est le premier pas pour arrêter</p>
      </header>

      <Tabs defaultValue="sante" className="tabs">
        <TabsList className="tabslist">
          <TabsTrigger value="sante">🫁 Santé</TabsTrigger>
          <TabsTrigger value="stats">📊 Statistiques</TabsTrigger>
          <TabsTrigger value="addiction">🧠 Addiction</TabsTrigger>
          <TabsTrigger value="societe">🌍 Société</TabsTrigger>
          <TabsTrigger value="solutions">🛠 Solutions</TabsTrigger>
        </TabsList>

        <TabsContent value="sante">
          <h2 className="text-2xl font-semibold mb-2">Effets sur la santé</h2>
          <p className="mb-2">Le tabac est la première cause évitable de mortalité dans le monde. Il nuit à presque tous les organes du corps. Voici les principales conséquences :</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Poumons :</strong> risque de cancers, bronchite chronique, emphysème.</li>
            <li><strong>Cœur :</strong> augmentation des risques d'infarctus et d'accidents vasculaires cérébraux.</li>
            <li><strong>Peau et dents :</strong> vieillissement prématuré, jaunissement des dents, mauvaise haleine.</li>
            <li><strong>Reproduction :</strong> troubles de la fertilité, complications pendant la grossesse.</li>
            <li><strong>Système immunitaire :</strong> affaibli, plus vulnérable aux infections.</li>
          </ul>
          <p>Arrêter de fumer permet déjà d'améliorer considérablement sa santé dès les premières semaines.</p>
        </TabsContent>

        <TabsContent value="stats">
          <h2 className="text-2xl font-semibold mb-2">Statistiques</h2>
          <p className="mb-4">Quelques chiffres clés pour mieux comprendre l’impact mondial et local du tabac :</p>
          <ul className="list-disc list-inside mb-4">
            <li>Plus de <strong>8 millions de morts</strong> par an dans le monde (OMS, 2020).</li>
            <li>Environ <strong>36 % des hommes</strong> et <strong>7 % des femmes</strong> dans le monde fument.</li>
            <li>En France, environ <strong>25 % des adultes</strong> fument quotidiennement.</li>
            <li>Les jeunes sont particulièrement exposés : près d’<strong>1 lycéen sur 2</strong> a déjà essayé de fumer.</li>
            <li>Le tabac coûte à la société des milliards d’euros chaque année (soins, absentéisme, décès prématuré...).</li>
          </ul>
          <p>Ces chiffres montrent à quel point le tabac reste un enjeu majeur de santé publique.</p>
        </TabsContent>

        <TabsContent value="addiction">
          <h2 className="text-2xl font-semibold mb-2">Pourquoi c'est addictif ?</h2>
          <p className="mb-4">La dépendance au tabac est principalement liée à la nicotine. Voici comment elle agit :</p>
          <ul className="list-disc list-inside mb-4">
            <li>Elle stimule la libération de dopamine dans le cerveau, procurant une sensation de plaisir et de détente.</li>
            <li>Elle agit rapidement : en quelques secondes après une bouffée, elle atteint le cerveau.</li>
            <li>Elle crée une dépendance physique (symptômes de manque) et psychologique (liens aux habitudes, stress, environnement social).</li>
          </ul>
          <p>Plus on fume, plus on renforce ces mécanismes. C’est pourquoi il est difficile d’arrêter seul.</p>
        </TabsContent>

        <TabsContent value="societe">
          <h2 className="text-2xl font-semibold mb-2">Le tabac dans la société</h2>
          <p className="mb-4">Le tabac est bien plus qu'une simple habitude individuelle :</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Publicité et influence :</strong> longtemps promu par le cinéma, les marques et les stars.</li>
            <li><strong>Inégalités :</strong> les populations les plus défavorisées fument davantage.</li>
            <li><strong>Jeunes :</strong> une cible privilégiée des fabricants via des arômes, visuels et réseaux sociaux.</li>
            <li><strong>Pression sociale :</strong> dans certains milieux, fumer est vu comme un rite d’entrée ou un signe de maturité.</li>
          </ul>
          <p>La société évolue, mais le tabac reste très présent dans notre quotidien et nos représentations.</p>
        </TabsContent>

        <TabsContent value="solutions">
          <h2 className="text-2xl font-semibold mb-2">Comment s’en sortir ?</h2>
          <p className="mb-4">Il existe de nombreuses solutions pour arrêter de fumer, adaptées à chaque profil :</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Substituts nicotiniques :</strong> gommes, patchs, pastilles, inhalateurs…</li>
            <li><strong>Accompagnement professionnel :</strong> médecin, tabacologue, psychologue.</li>
            <li><strong>Applications et communautés :</strong> pour suivre ses progrès et rester motivé.</li>
            <li><strong>Thérapies comportementales :</strong> pour changer ses habitudes et éviter les rechutes.</li>
            <li><strong>Entourage :</strong> en parler à ses proches peut être un soutien essentiel.</li>
          </ul>
          <p>Chaque tentative est un pas de plus vers la réussite. Il n’y a pas d’échec, seulement des apprentissages.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
