"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";

export default function TabacInfoPage() {
  return (
    <div className="tabacinfopage">
      <header>
        <h1>Tout savoir sur le tabac</h1>
        <p>Comprendre, c’est le premier pas pour arrêter</p>
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
          <h2>Effets sur la santé</h2>

          <p>
            Le tabac est la principale cause de mortalité évitable dans le
            monde, avec plus de{" "}
            <strong>8 millions de décès chaque année</strong> (OMS). Il contient
            plus de <strong>7 000 substances chimiques</strong>, dont au moins{" "}
            <strong>70 sont cancérigènes</strong>. La fumée affecte presque tous
            les organes du corps.
          </p>

          <h3>🧠 Quels systèmes sont touchés ?</h3>
          <ul>
            <li>
              <strong>🫁 Appareil respiratoire :</strong> bronchite chronique,
              emphysème, BPCO,{" "}
              <strong>cancer des poumons (90 % des cas liés au tabac)</strong>.
            </li>
            <li>
              <strong>❤️ Système cardiovasculaire :</strong> hausse de la
              pression artérielle, infarctus, AVC, artérite.
            </li>
            <li>
              <strong>🧬 Appareil reproducteur :</strong> baisse de fertilité,
              troubles de l’érection, grossesse extra-utérine, complications
              fœtales.
            </li>
            <li>
              <strong>🦷 Bouche et peau :</strong> cancers de la bouche/larynx,
              perte de dents, mauvaise haleine, rides précoces.
            </li>
            <li>
              <strong>🧠 Cerveau :</strong> dépendance, troubles de l’humeur,
              anxiété, insomnie.
            </li>
            <li>
              <strong>🦠 Système immunitaire :</strong> affaibli, augmentation
              du risque d’infections respiratoires, ralentissement de la
              cicatrisation.
            </li>
            <li>
              <strong>🧓 Vieillissement global :</strong> accéléré à tous les
              niveaux (peau, organes internes, fonctions cognitives).
            </li>
          </ul>

          <h3>📈 Ce qui s’améliore quand on arrête :</h3>
          <ul>
            <li>
              <strong>20 minutes</strong> : tension et rythme cardiaque
              redeviennent normaux.
            </li>
            <li>
              <strong>48 h</strong> : la nicotine est éliminée, l’odorat et le
              goût s’améliorent.
            </li>
            <li>
              <strong>3 mois</strong> : la respiration devient plus facile, la
              toux diminue.
            </li>
            <li>
              <strong>1 an</strong> : risque d’infarctus réduit de moitié.
            </li>
            <li>
              <strong>5 à 10 ans</strong> : le risque de cancer diminue
              fortement, parfois égal à celui d’un non-fumeur.
            </li>
          </ul>

          <h3>👶 Femmes enceintes, enfants : des dangers accrus</h3>
          <ul>
            <li>
              Risque de <strong>fausse couche</strong>, de{" "}
              <strong>prématurité</strong>, de{" "}
              <strong>mort subite du nourrisson</strong>.
            </li>
            <li>
              Retard de croissance du fœtus, malformations, troubles
              neurodéveloppementaux.
            </li>
            <li>
              Enfants exposés au tabagisme passif : plus de risques d’asthme,
              d’otites, de bronchites.
            </li>
          </ul>

          <h3>🚭 Fumer passivement, c’est dangereux aussi</h3>
          <p>
            Le tabagisme passif tue plus de{" "}
            <strong>1,2 million de personnes chaque année</strong> dans le
            monde. Il est nocif même à faibles doses.
          </p>
          <ul>
            <li>
              Les enfants y sont très sensibles : risques de retard pulmonaire,
              infections respiratoires fréquentes.
            </li>
            <li>
              Les non-fumeurs exposés risquent aussi des cancers, maladies
              cardiovasculaires et respiratoires.
            </li>
          </ul>

          <div>
            <h4>🔍 Bon à savoir</h4>
            <p>
              Le tabac ne cause pas "juste" le cancer des poumons. Il est aussi
              responsable de <strong>17 types de cancers différents</strong>{" "}
              (bouche, pancréas, vessie, reins, col de l’utérus, etc).
            </p>
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <h2>Statistiques</h2>
          <p>
            Quelques chiffres clés pour mieux comprendre l’impact mondial et
            local du tabac :
          </p>
          <ul>
            <li>
              Plus de <strong>8 millions de morts</strong> par an dans le monde
              (OMS, 2020).
            </li>
            <li>
              Environ <strong>36 % des hommes</strong> et{" "}
              <strong>7 % des femmes</strong> dans le monde fument.
            </li>
            <li>
              En France, environ <strong>25 % des adultes</strong> fument
              quotidiennement.
            </li>
            <li>
              Les jeunes sont particulièrement exposés : près d’
              <strong>1 lycéen sur 2</strong> a déjà essayé de fumer.
            </li>
            <li>
              Le tabac coûte à la société des milliards d’euros chaque année
              (soins, absentéisme, décès prématuré...).
            </li>
          </ul>
          <p>
            Ces chiffres montrent à quel point le tabac reste un enjeu majeur de
            santé publique.
          </p>
        </TabsContent>

        <TabsContent value="addiction">
          <h2>Pourquoi c'est addictif ?</h2>
          <p>
            La dépendance au tabac est principalement liée à la nicotine. Voici
            comment elle agit :
          </p>
          <ul>
            <li>
              Elle stimule la libération de dopamine dans le cerveau, procurant
              une sensation de plaisir et de détente.
            </li>
            <li>
              Elle agit rapidement : en quelques secondes après une bouffée,
              elle atteint le cerveau.
            </li>
            <li>
              Elle crée une dépendance physique (symptômes de manque) et
              psychologique (liens aux habitudes, stress, environnement social).
            </li>
          </ul>
          <p>
            Plus on fume, plus on renforce ces mécanismes. C’est pourquoi il est
            difficile d’arrêter seul.
          </p>
        </TabsContent>

        <TabsContent value="societe">
          <h2>Le tabac dans la société</h2>
          <p>
            Le tabac est bien plus qu'une simple habitude individuelle :
          </p>
          <ul>
            <li>
              <strong>Publicité et influence :</strong> longtemps promu par le
              cinéma, les marques et les stars.
            </li>
            <li>
              <strong>Inégalités :</strong> les populations les plus
              défavorisées fument davantage.
            </li>
            <li>
              <strong>Jeunes :</strong> une cible privilégiée des fabricants via
              des arômes, visuels et réseaux sociaux.
            </li>
            <li>
              <strong>Pression sociale :</strong> dans certains milieux, fumer
              est vu comme un rite d’entrée ou un signe de maturité.
            </li>
          </ul>
          <p>
            La société évolue, mais le tabac reste très présent dans notre
            quotidien et nos représentations.
          </p>
        </TabsContent>

        <TabsContent value="solutions">
          <h2>Comment s’en sortir ?</h2>
          <p>
            Il existe de nombreuses solutions pour arrêter de fumer, adaptées à
            chaque profil :
          </p>
          <ul>
            <li>
              <strong>Substituts nicotiniques :</strong> gommes, patchs,
              pastilles, inhalateurs…
            </li>
            <li>
              <strong>Accompagnement professionnel :</strong> médecin,
              tabacologue, psychologue.
            </li>
            <li>
              <strong>Applications et communautés :</strong> pour suivre ses
              progrès et rester motivé.
            </li>
            <li>
              <strong>Thérapies comportementales :</strong> pour changer ses
              habitudes et éviter les rechutes.
            </li>
            <li>
              <strong>Entourage :</strong> en parler à ses proches peut être un
              soutien essentiel.
            </li>
          </ul>
          <p>
            Chaque tentative est un pas de plus vers la réussite. Il n’y a pas
            d’échec, seulement des apprentissages.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
