type Policy = {
  title: string;
  summary: string;
  sections: {
    title: string;
    paragraphs: string[];
    links?: { label: string; href: string }[];
  }[];
};

export const policies: Record<string, Policy> = {
  privacy: {
    title: "Privacy Policy",
    summary: "What happens to your information when you browse or send a project enquiry.",
    sections: [
      {
        title: "Who runs this site",
        paragraphs: [
          "I’m Asad Mehmood, known as ScriptLilla, an individual developer in Sialkot, Pakistan. For privacy questions, email asadmehmood4804@gmail.com.",
        ],
      },
      {
        title: "When you browse",
        paragraphs: [
          "You can browse without an account. This site has no analytics, advertising trackers or checkout. GitHub Pages hosts it and may process your IP address, browser details and request logs to deliver and protect the site.",
        ],
      },
      {
        title: "When you send an enquiry",
        paragraphs: [
          "The form asks for your email, project brief and service choice, with budget and timing options. Ticking the privacy box and pressing Send enquiry sends these details through Formspree so I can reply. Formspree may also process browser and security information, including your IP address. It connects only when you submit.",
          "I use messages to discuss and deliver work and keep related records. I don’t sell your information or add you to marketing lists. Depending on applicable law, this processing supports your enquiry, our agreement, legal obligations or the legitimate need to manage correspondence. Keep passwords, payment details and sensitive information out of your message.",
        ],
      },
      {
        title: "Your saved draft",
        paragraphs: [
          "Your unsent brief, email and choices stay in this tab so you can visit a policy and come back. They can be restored for 24 hours after your last edit; expired drafts are removed when you reopen the form. Clear draft or a successful submission removes the draft. Consent is never saved.",
          "Closing the tab normally ends the session, though your browser may restore it. If browser storage is blocked, drafts last only during navigation within the site. Unsent drafts are not sent to me or Formspree.",
        ],
      },
      {
        title: "Videos and other services",
        paragraphs: [
          "The character clip is hosted with the site. An optional YouTube showcase connects to YouTube only after you press Play. YouTube can then process device and playback information. Closing the player stops that embed but does not erase information already received.",
          "Email, Discord and other external services follow their own privacy policies. Discord server messages may be public, so ask for a private channel before sharing confidential details. These providers may process information outside your country, including in the United States. I share information only for your enquiry or agreed work, with permission, or as required by law.",
        ],
        links: [
          { label: "GitHub privacy", href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" },
          { label: "Formspree privacy", href: "https://formspree.io/legal/privacy-policy/" },
          { label: "Google privacy", href: "https://policies.google.com/privacy" },
          { label: "Discord privacy", href: "https://discord.com/privacy" },
        ],
      },
      {
        title: "Keeping and deleting information",
        paragraphs: [
          "I keep correspondence as needed for enquiries, projects and legal records. There is no fixed mailbox deletion schedule; provider logs, backups and submission history follow their own retention rules. Email me to discuss access or deletion.",
          "Depending on your local law, you may have rights to access, correct, delete, restrict or transfer your information, object to its use, withdraw optional consent, or complain to a privacy authority. Withdrawal does not undo earlier lawful processing. Legal retention requirements may limit deletion. Requests are handled within applicable legal deadlines.",
          "This portfolio does not seek children’s personal information. A parent or guardian can contact me about information a child has sent. Please report any suspected privacy or security issue privately by email.",
        ],
      },
    ],
  },
  terms: {
    title: "Commission terms",
    summary: "How we agree on a project before work starts.",
    sections: [
      {
        title: "Enquiries are free",
        paragraphs: [
          "This is Asad Mehmood’s portfolio, operating as ScriptLilla from Sialkot, Pakistan. Sending a brief starts a conversation. It does not book a deadline or create a paid agreement. This website takes no payments.",
        ],
      },
      {
        title: "Agree the work first",
        paragraphs: [
          "Before work or payment, we agree in writing on scope, deliverables, acceptance, timing, price, currency and payment method. The agreement also covers revisions, support, confidentiality, cancellation and ownership. Added features need a separate agreement.",
          "Share your technical requirements and only assets you have permission to use. Keep platform passwords private. Prices and deadlines depend on the project; player growth and earnings are not guaranteed.",
        ],
      },
      {
        title: "Code and asset rights",
        paragraphs: [
          "The project agreement defines source handover and ownership. Existing code, libraries and licensed assets keep their own terms. Portfolio artwork and platform marks belong to their respective owners. This site is not endorsed by Roblox.",
        ],
      },
      {
        title: "Using the site",
        paragraphs: [
          "Use the site lawfully. Don’t impersonate me, disrupt it or attempt unauthorised access. External platforms follow their own terms. Content, links and availability can change.",
          "Applicable law and mandatory consumer rights take priority. These terms do not exclude liability that cannot lawfully be excluded or impose an exclusive court. Email asadmehmood4804@gmail.com with any questions.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    summary: "No advertising or analytics tracking. One temporary draft to save you retyping.",
    sections: [
      {
        title: "What the site stores",
        paragraphs: [
          "The site sets no first-party cookies. It saves your unsent enquiry in this tab, including your brief, email and choices. The draft can be restored for 24 hours; consent is never saved. Clear draft or a successful submission removes it. Expired drafts are removed on your next form visit.",
          "Closing the tab normally clears its session, though browser session restoration can preserve it. Day and Night mode stay in memory during navigation; reloading starts in Night.",
        ],
      },
      {
        title: "External services",
        paragraphs: [
          "YouTube connects only when you choose Play on a showcase. Formspree connects only when you send an enquiry. Those services, and websites you follow through external links, have their own privacy and storage practices. The character clip and button effects do not save preferences or track you.",
        ],
      },
      {
        title: "Your choices",
        paragraphs: [
          "There is no site-wide tracking banner because no advertising or analytics tracking is enabled. You control each optional video and can clear your draft at any time. Browser settings also let you block storage, though draft restoration may stop working. See Privacy for provider details and contact options.",
        ],
      },
    ],
  },
  refunds: {
    title: "Cancellations & refunds",
    summary: "No purchases happen on this website. Commission terms are agreed before payment.",
    sections: [
      {
        title: "Before you pay",
        paragraphs: [
          "Browsing and enquiries are free. There is no checkout or physical product to return. For a separate commission, we agree in writing how deposits, completed work, cancellation and refunds will be handled before you pay.",
        ],
      },
      {
        title: "If plans change",
        paragraphs: [
          "Email asadmehmood4804@gmail.com with your project reference and the issue. We’ll review the agreement and work completed to decide the next step, such as a correction, cancellation or refund. Any refund or withdrawal rights required by law still apply, including those that may apply when digital services begin.",
        ],
      },
      {
        title: "Platform purchases",
        paragraphs: [
          "For purchases made through Roblox or another platform, contact its support and the relevant seller. Never send full card details or passwords with a refund request.",
        ],
      },
    ],
  },
  accessibility: {
    title: "Accessibility",
    summary: "Ways to browse, control motion and get help.",
    sections: [
      {
        title: "Keyboard and reading",
        paragraphs: [
          "I aim to follow WCAG 2.2 AA practices, including readable contrast, image descriptions, labelled fields and visible keyboard focus. Use Tab to move between controls, Enter to follow links, and Enter or Space for buttons. The first link skips to the main content. Escape closes the menu or certificate preview.",
        ],
      },
      {
        title: "Motion and video",
        paragraphs: [
          "Your device’s reduced-motion setting limits animation. You can pause the character clip by clicking it or pressing Enter or Space while it is focused. Optional showcase videos start only when you choose Play. Day and Night switch the site’s colour scheme.",
        ],
      },
      {
        title: "Need help?",
        paragraphs: [
          "Email asadmehmood4804@gmail.com with the page and what is getting in your way. You can request a text alternative for a certificate or showcase, or contact me directly if the form is difficult to use. Automated checks do not catch every barrier, and external players may have their own limitations.",
        ],
      },
    ],
  },
};
