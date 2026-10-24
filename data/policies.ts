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
        title: "Project enquiries",
        paragraphs: [
          "The contact page asks you to choose a service, add a short description and provide an email address for a reply. Rough budget and timing choices can be left as flexible or to discuss. It does not request your home address, documents, passwords or payment details. Your unsent draft is kept in this tab's sessionStorage so visiting this policy, going back or refreshing does not erase it. It includes the current step, service, budget, timing, brief and reply email. Consent is never saved or preselected on restoration. The draft is removed after confirmed Formspree acceptance or when you choose Clear draft. It can be restored for 24 hours after its last update; an expired entry is removed when the form is next opened. Closing the tab normally ends its session, although browser session restoration can preserve it. If browser storage is blocked, a memory fallback supports navigation within the site but cannot survive a full page reload. Drafts are not sent to the owner or Formspree until you choose Send enquiry.",
          "After you tick the initially unchecked privacy acknowledgement and choose Send enquiry, the site sends your email, service, description, budget and timing choices to Formspree, which processes the enquiry and forwards a notification to the owner. Formspree may also process IP address, browser, referring-site and security information under its own policy: https://formspree.io/legal/privacy-policy/. Information may be processed in the United States and other countries where its providers operate. No Formspree request occurs merely from opening the contact page. Do not include sensitive personal data or confidential third-party material.",
          "A success message means Formspree accepted the enquiry, not that an email has been independently confirmed in the recipient's inbox. If no confirmation arrives, avoid repeated submissions and use the direct contact routes. The current free Formspree plan retains dashboard submission history for up to 30 days; mailbox records and provider security logs have separate retention rules. Requests about your enquiry can be sent to the contact email above.",
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
          "Hosting, Formspree, email, Discord and an activated YouTube player may process information outside your country, under their own policies and applicable safeguards. Information is shared only as needed for the enquiry or agreed work, with permission, or where law requires it. External links lead to independent services. No automated decisions about visitors are made by this portfolio.",
        ],
      },
      {
        title: "Retention and security",
        paragraphs: [
          "Correspondence is retained for handling enquiries, agreed projects and related recordkeeping needs. A fixed mailbox retention schedule has not been established. Contact the address above to discuss a message or request deletion, subject to applicable legal and contractual retention requirements. Formspree dashboard history follows the plan limit described above; other provider logs and backups follow their own rules.",
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
          "The application does not set first-party cookies or use localStorage, analytics, advertising or fingerprinting. The theme exists in application memory. Two functional sessionStorage entries may be used. scriptlilla-hero-session-v1 records which of seven decorative fly-bys have appeared and when the next one is due; it contains no personal details or visitor identifier. scriptlilla-enquiry-draft-v1 keeps an unsent enquiry's step, choices, brief and email in the current tab so policy navigation and refresh do not discard them. Draft consent is not stored. The draft has a 24-hour restore window and is removed on confirmed acceptance, Clear draft, or the next form visit after expiry. Neither entry is sent to a server for analytics. Closing the tab normally ends its session; browser session restoration can preserve a restored tab. If storage is blocked, page memory supports navigation within the site. Ordinary caching helps deliver local assets.",
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
          "The site does not run analytics or advertising cookies, so it does not show a site-wide tracking-consent banner. Per-tab motion state is described above, and the seven decorative fly-bys run automatically once per tab, without replay controls. Reduced-motion and data-saving preferences suppress automatic motion. The existing avatar motion control also pauses the decorative effects. External video loading is controlled at each player. Formspree connects only after an explicit enquiry submission. This describes the configuration, not a blanket exemption from local requirements for storage or processing; hosting and providers have their own practices.",
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
          "The three-step enquiry has visible labels, radio-button choices, required-field instructions, associated errors and an explicit unchecked acknowledgement. Sending requires your action. Loading, accepted, failed and rate-limit states are explained, with direct Discord and email alternatives. Direct contact links also work without JavaScript. Short profile cards support previous/next controls and arrow keys; their information remains available without JavaScript. FAQ answers open and close with a short measured animation, or instantly for keyboard and reduced-motion use.",
          "Seven brief decorative character fly-bys can appear once per tab. They do not accept pointer input or block controls. There are no floating Effects or replay buttons. The existing avatar motion control pauses decorative motion. Reduced-motion and data-saving preferences suppress automatic effects. Hidden tabs do not play the fly-bys. Switching to Day mode shows a brief sun-and-beam cue. Keyboard and reduced-motion visitors receive a visible still sun and message instead of motion, with the warm palette applied immediately. Per-tab progress prevents repeated fly-bys while navigating or refreshing.",
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
