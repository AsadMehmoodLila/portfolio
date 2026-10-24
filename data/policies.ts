type Policy = {
  title: string;
  summary: string;
  sections: { title: string; paragraphs: string[] }[];
};
export const policies: Record<string, Policy> = {
  privacy: {
    title: "Privacy Policy",
    summary:
      "How this individual portfolio handles browsing, commission enquiries and optional showcase videos.",
    sections: [
      {
        title: "Operator",
        paragraphs: [
          "Asad Mehmood, known as ScriptLilla, operates this individual portfolio from Sialkot, Pakistan. Contact asadmehmood4804@gmail.com for privacy enquiries. No registered company or public storefront is represented. A private home address is not published.",
        ],
      },
      {
        title: "Browsing",
        paragraphs: [
          "No account is required. The site has no analytics, advertising pixels, fingerprinting or payment collection. Fonts, images, styles and application scripts are served from this site's origin. The theme choice exists in memory during navigation, rather than in browser storage.",
          "GitHub Pages and its infrastructure may process IP addresses, browser information and request logs to deliver and protect the site. GitHub controls those records and their retention; the owner does not operate a visitor-log database. Provider notice: https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement.",
        ],
      },
      {
        title: "Project brief builder",
        paragraphs: [
          "The optional brief builder prepares text in the current browser tab. Project name, service and description are required; budget, timing, devices and a reference link are optional. It does not require your name, email, address or payment details, submit entries to a server, or save them in browser storage. Refreshing clears its application state.",
          "An unchecked acknowledgement is required before preparing or copying a brief. Copy writes to your device clipboard, replacing its previous contents; a clipboard manager may retain it. Open email draft passes the message to your configured email app. You review and send it there; this site does not confirm delivery. Exclude credentials, player data, identity documents and confidential third-party material.",
        ],
      },
      {
        title: "Messages you choose to send",
        paragraphs: [
          "Email or Discord discloses the information you send, your account identifier and any attachments to the provider and recipient. Server messages may also be visible to members or moderators. Ask for an appropriate private channel before sharing confidential details. Provider notices: https://policies.google.com/privacy and https://discord.com/privacy.",
          "Correspondence is used to respond, assess a project, agree and deliver work, and manage related records. It is not sold or used to enrol you in marketing. Depending on applicable law, processing may be necessary for steps you request before an agreement, performance of an agreement, a legal duty or a legitimate interest in managing correspondence. Optional marketing would require a separate choice.",
        ],
      },
      {
        title: "Optional video players",
        paragraphs: [
          "Local video is delivered by the site host. A YouTube player is blocked until you choose its labelled Play button. The nearby notice explains that this connects to YouTube; you can read the summary instead or use the separate external link.",
          "Playing loads youtube-nocookie.com, which can receive IP, browser and request information and process playback information under Google's policies. Privacy-enhanced mode does not mean zero data collection. Close video removes the player and stops further activity by that embed; it cannot erase information already processed or storage created by the provider. Each player requires its own activation.",
        ],
      },
      {
        title: "Providers and international processing",
        paragraphs: [
          "Hosting, email, Discord and an activated YouTube player may process information outside your country, under their own policies and applicable safeguards. Information is shared only as needed for the enquiry or agreed work, with permission, or where law requires it. External links lead to independent services. No automated decisions about visitors are made by this portfolio.",
        ],
      },
      {
        title: "Retention and security",
        paragraphs: [
          "Correspondence is retained for handling enquiries, agreed projects and related recordkeeping needs. A fixed schedule has not been established. Contact the address above to discuss a message or request deletion, subject to applicable legal and contractual retention requirements. Provider logs, backups and clipboard history follow their provider or device settings.",
          "Absolute security cannot be promised. Avoid sending passwords, financial-account details and unnecessary personal information. Report suspected misuse privately by email.",
        ],
      },
      {
        title: "Choices and rights",
        paragraphs: [
          "You can browse without preparing a brief, sending a message or loading an external video. Where applicable law grants rights, request access, correction, deletion, restriction, objection, portability or withdrawal of optional consent by email. Withdrawal does not undo earlier lawful processing. Proportionate identity verification and lawful limits may apply; requests are handled within the legally required period. You may complain to a competent authority where available.",
        ],
      },
      {
        title: "Children and updates",
        paragraphs: [
          "This professional portfolio does not solicit children's personal information. A parent or guardian can contact the owner about information a child has sent. Commissions must be agreed by someone able to enter the relevant agreement, with guardian involvement where required. New analytics, checkout, hosted forms or external services require reassessment before activation. Changes are reflected in the revision date.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    summary:
      "Website use and the basis for discussing a Roblox scripting commission.",
    sections: [
      {
        title: "Operator and purpose",
        paragraphs: [
          "Asad Mehmood, known as ScriptLilla, is an individual developer in Sialkot, Pakistan. Contact asadmehmood4804@gmail.com. This site presents work and prepares enquiries. It has no checkout or payment collection. An enquiry does not establish a paid engagement or reserve a deadline.",
        ],
      },
      {
        title: "Agreeing a commission",
        paragraphs: [
          "Before work or payment, a separate written agreement should identify the parties, scope, acceptance criteria, deliverables, timing, milestones, price and currency, payment method, revisions, cancellation terms, support, confidentiality and ownership. No fixed price, turnaround, unlimited revisions, player growth, earnings or exploit-proof game is promised here.",
          "Changes outside scope need a separate estimate and agreement. Disclose technical constraints, integrations and target devices. Supply only materials you have permission to share. Do not send platform passwords.",
        ],
      },
      {
        title: "Source, assets and ownership",
        paragraphs: [
          "Source handover and usage or ownership rights are defined in the project agreement. Pre-existing modules, libraries and licensed assets may carry separate terms. Payment does not automatically transfer rights the developer does not own. Source reuse follows the actual repository licence.",
          "The portfolio describes the owner's contribution and relevant credits. Third-party marks, certificate issuers and assets retain their owners' rights. No Roblox or other platform endorsement is claimed. Viewing does not grant permission to copy third-party material or competitor work.",
        ],
      },
      {
        title: "Acceptable use and external services",
        paragraphs: [
          "Use the site lawfully. Do not attempt unauthorised access, distribute malware, impersonate the owner or interfere with availability. Security concerns can be reported privately by email. Ordinary browsing and accessibility tools are permitted.",
          "Roblox, GitHub, Discord, email and YouTube operate under their own terms and policies. Their accounts, content, moderation, transactions and availability are controlled by their operators.",
        ],
      },
      {
        title: "Accuracy, availability and lawful limits",
        paragraphs: [
          "Care is taken to describe work accurately, but content and links may change. Artwork is not a benchmark or earnings claim. Planned showcases are not completed commissions. The portfolio is provided as available, without a promise of uninterrupted or error-free access.",
          "Disclaimers or liability limits apply only where lawful. They do not exclude fraud, deliberate wrongdoing or liability and consumer rights that cannot legally be excluded. Mandatory statutory protections remain unaffected.",
        ],
      },
      {
        title: "Applicable law and questions",
        paragraphs: [
          "Applicable mandatory law takes priority. These website terms do not impose an exclusive court or remove protections that may apply elsewhere. Cross-border or consumer engagements may need additional terms. Raise questions by email before commissioning work. Changes are indicated by the revision date.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    summary:
      "No optional tracking on ordinary visits. External video players load only after your choice.",
    sections: [
      {
        title: "The portfolio itself",
        paragraphs: [
          "The application does not set first-party cookies or use localStorage, sessionStorage, analytics, advertising or fingerprinting. The theme and brief exist in application memory. Ordinary caching helps deliver local assets. Copying a brief uses the device clipboard only on request.",
        ],
      },
      {
        title: "Optional videos",
        paragraphs: [
          "A YouTube showcase starts with a local poster. No player, remote thumbnail or YouTube preconnection is requested before Play. The adjacent notice explains the connection and links to Privacy. Activation loads a privacy-enhanced player that processes playback information under Google's policies. You can read the summary, open YouTube separately or close the loaded player.",
          "Closing the embed stops its further activity; it does not erase provider data or any storage already created. Browser settings control provider storage. Local video does not require a YouTube connection.",
        ],
      },
      {
        title: "Why there is no site-wide banner",
        paragraphs: [
          "The default application has no optional tracking technology to accept or reject, so no site-wide cookie banner is shown. External video loading is controlled at each player. This describes the present technical configuration, not a blanket exemption from local law. Hosting and external providers have their own security and delivery practices.",
        ],
      },
      {
        title: "Links and future changes",
        paragraphs: [
          "Following a link to Discord, Roblox, GitHub, YouTube or email leads to an independent service that may use cookies. Before adding analytics, advertising, storage or another embed, reassess applicable requirements, disclose purposes and durations, and obtain a valid choice where required. Continuing to browse is not consent.",
        ],
      },
    ],
  },
  refunds: {
    title: "Refund & Return Policy",
    summary:
      "No payments on this portfolio. Separate commission cancellation and refund terms must be agreed before payment.",
    sections: [
      {
        title: "Website purchases and returns",
        paragraphs: [
          "Browsing is free. There is no store, checkout, subscription, payment form or physical goods. There are no purchases processed by the website to return. A project enquiry is not a purchase or payment.",
        ],
      },
      {
        title: "Separate scripting commissions",
        paragraphs: [
          "Before payment, obtain written terms identifying the seller, scope, price and currency, milestones, delivery, payment method, revisions, acceptance, support, cancellation and refunds. They should explain how completed work and deposits are handled if the project ends. No universal non-refundable-deposit rule or automatic refund promise is imposed here.",
        ],
      },
      {
        title: "Problems and statutory rights",
        paragraphs: [
          "For a cancellation or problem, contact asadmehmood4804@gmail.com with the project reference and explanation. The agreement and applicable law determine the response, including correction, a partial refund, refund or other remedy. Mandatory consumer, withdrawal and refund rights remain unaffected. Extra disclosures or express requests may be required before digital services begin during a statutory withdrawal period.",
        ],
      },
      {
        title: "Platform purchases",
        paragraphs: [
          "Roblox or other linked platforms process their own transactions. Use the relevant platform's support and identified seller's terms for purchases there. This notice does not remove an operator's legal obligations. Do not send full card details, credentials or identity documents with a refund enquiry.",
        ],
      },
    ],
  },
  accessibility: {
    title: "Accessibility",
    summary:
      "Readable content, keyboard access, responsive layouts and a choice of day or night mode.",
    sections: [
      {
        title: "Approach",
        paragraphs: [
          "The portfolio aims to follow WCAG 2.2 Level AA practices: semantic headings, meaningful text alternatives, readable contrast, visible focus, labelled controls, keyboard access and responsive layouts. This statement is not a certification of complete WCAG or ADA compliance.",
        ],
      },
      {
        title: "Navigation and controls",
        paragraphs: [
          "The first keyboard link skips to main content. Tab moves through controls; Enter activates links, and Enter or Space activates buttons. Escape closes the mobile menu and restores focus. FAQs use native expandable details. Day/night affects the whole page. Interaction motion respects reduced-motion preferences.",
          "Certificate previews use a native modal dialog. Escape or Close certificate returns focus to the opener. Text identifies the subject, issuer and type. Some scan text may not be machine readable; ask by email for a text alternative.",
        ],
      },
      {
        title: "Briefs and videos",
        paragraphs: [
          "The brief builder has visible labels, required-field instructions, associated errors and an explicit unchecked acknowledgement. Nothing is sent automatically. If clipboard access fails, prepared text remains selectable. Direct email and Discord contact links work without JavaScript.",
          "Videos have visitor-controlled playback and surrounding text summaries. Self-hosted videos support caption tracks; captions or transcripts should accompany new showcases where needed. Third-party players and linked services have their own accessibility limitations.",
        ],
      },
      {
        title: "Feedback and limitations",
        paragraphs: [
          "Automated checks cover only part of accessibility. Manual assistive-technology testing and feedback remain valuable. Email asadmehmood4804@gmail.com with the page, task and barrier. Share browser or assistive-technology details only if helpful and avoid sensitive information. An alternative way to access a certificate or showcase can be discussed.",
        ],
      },
    ],
  },
};
