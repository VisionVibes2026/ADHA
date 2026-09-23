export const DASHBOARD_METRICS = {
  // Note: These metrics reflect the sample dataset loaded in this prototype.
  // In production, values are computed from the live repository index.
  digitalDocuments: { label: 'Digital Documents', description: 'Digitized writings, speeches, and official records indexed in the repository.', note: 'Sample dataset' },
  manuscripts: { label: 'Manuscripts & Drafts', description: 'Original authorial typescripts, handwritten notes, and annotated folios.', note: 'Sample dataset' },
  audioVideo: { label: 'Audio / Video', description: 'Oral history recordings, radio broadcasts, and archival film reels.', note: 'Sample dataset' },
  photographs: { label: 'Photographs', description: 'Silver gelatin prints, press photographs, and institutional portraits.', note: 'Sample dataset' }
};

export const PENDING_REVIEW_QUEUE = [
  {
    id: 'MS-2041',
    title: 'Annihilation of Caste — 1936 Handwritten Draft Annotations',
    type: 'Manuscript Folio',
    details: 'English | Author Annotations',
    issue: 'OCR confidence 74% — review needed',
    severity: 'Medium',
    assignedCurator: 'Dr. K. G. Ramarao',
    status: 'Pending'
  },
  {
    id: 'RP-1082',
    title: 'Constituent Assembly Opening Statement on Fundamental Rights',
    type: 'Official Speech Record',
    details: 'English Transcript',
    issue: 'Metadata missing — author/source tag needed',
    severity: 'High',
    assignedCurator: 'P. R. Deshmukh',
    status: 'Pending'
  },
  {
    id: 'RM-0292',
    title: 'Round Table Conference London Delegation 1931',
    type: 'Silver Gelatin Print',
    details: 'St. James Palace',
    issue: 'Date/location unverified — cross-match AIR',
    severity: 'Medium',
    assignedCurator: 'Archivist Registry Pool',
    status: 'Pending'
  },
  {
    id: 'DOC-V3',
    title: 'Writings and Speeches, Volume 3 Official Gazette Edition',
    type: '840-Page Compilation',
    details: 'Government Press Bombay',
    issue: 'Ready for final archival sign-off',
    severity: 'Routine',
    assignedCurator: 'Head of Archival Board',
    status: 'Pending'
  }
];

export const ARCHIVE_RECORDS = [
  {
    id: 'ADHA-DOC-001',
    legacyId: 'ADHA-DOC-1936-AOC',
    title: 'Annihilation of Caste — First Printed Edition with Author Preface',
    subtitle: 'Undelivered address prepared for the Jat-Pat-Todak Mandal Annual Conference, Lahore',
    type: 'Printed Monograph',
    medium: 'First Edition Booklet & Critical Edition',
    date: '15 May 1936',
    location: 'Bombay Press / Lahore Mandal',
    language: 'English (with Sanskrit & Marathi Notes)',
    script: 'Latin Script (Caslon)',
    institution: 'National Archives of India',
    source: 'Dr. Ambedkar Foundation — Writings and Speeches, Vol. 1',
    rights: 'Public Domain',
    verification: 'Verified',
    verificationState: 'Verified',
    verified: true,
    year: '1936',
    category: 'Writings & Speeches',
    sha256: 'a9b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0'
  },
  {
    id: 'ADHA-DIS-1923-LSE',
    title: 'The Problem of the Rupee: Its Origin and Its Solution',
    subtitle: 'Doctoral dissertation submitted to the University of London for D.Sc. (Econ)',
    type: 'Academic Thesis',
    medium: 'Hardbound Typescript',
    date: 'March 1923',
    location: 'P. S. King & Son, London',
    language: 'English',
    script: 'Latin Script',
    institution: 'Columbia University Rare Books',
    source: 'Columbia University Rare Book & Manuscript Library',
    rights: 'Public Domain',
    verification: 'Preserved',
    verificationState: 'Verified',
    verified: true,
    year: '1923',
    category: 'Writings & Speeches',
    sha256: 'f8e7d6c5b4a3928170654321fedcba0987654321fedcba0987654321fedcba09'
  },
  {
    id: 'ADHA-CAD-1946-DEC17',
    title: 'Speech on the Objective Resolution in the Constituent Assembly',
    subtitle: 'Historic intervention proposing a strong, united, democratic republic with social safeguards',
    type: 'Parliamentary Record',
    medium: 'Stenographic Transcript',
    date: '17 Dec 1946',
    location: 'Constitution Hall, New Delhi',
    language: 'English / Hindustani',
    script: 'Bilingual Ledger',
    institution: 'Parliament of India Digital Library',
    source: 'Constituent Assembly Debates (Official Report)',
    rights: 'Government of India — Public Record',
    verification: 'Digitized Master',
    verificationState: 'Verified',
    verified: true,
    year: '1946',
    category: 'Constituent Assembly Debates',
    sha256: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
  },
  {
    id: 'ADHA-DEC-1927-MAH',
    title: 'Mahad Satyagraha Declaration at Chavdar Tale',
    subtitle: 'Proclamation affirming fundamental human rights to public water sources',
    type: 'Field Declaration',
    medium: 'Lithographed Broadside',
    date: '20 Mar 1927',
    location: 'Kolaba District',
    language: 'Marathi',
    script: 'Modi & Devanagari',
    institution: 'Maharashtra State Archives',
    source: 'Maharashtra State Archives — Dr. Ambedkar Special Collection',
    rights: 'Public Domain',
    verification: 'High-Res Scan',
    verificationState: 'Verified',
    verified: true,
    year: '1927',
    category: 'Writings & Speeches',
    sha256: '9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba'
  },
  {
    id: 'ADHA-PUB-1947-STM',
    title: 'States and Minorities: What are Their Rights and How to Secure Them',
    subtitle: 'Memorandum on the safeguards for minorities submitted to the Constituent Assembly',
    type: 'Legal Memorandum',
    medium: 'Thacker & Co. Print',
    date: 'April 1947',
    location: 'Bombay',
    language: 'English',
    script: 'Latin Script',
    institution: 'Dr. Ambedkar National Memorial',
    source: 'Dr. Ambedkar Foundation — Writings and Speeches, Vol. 2',
    rights: 'Public Domain',
    verification: 'Verified',
    verificationState: 'Verified',
    verified: true,
    year: '1947',
    category: 'Legal Manuscripts',
    sha256: '4e5c718a204093817f9e8a7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a'
  },
  {
    id: 'ADHA-CON-1948-DFT',
    title: 'Draft Constitution of India as Prepared by the Drafting Committee',
    subtitle: 'Official submission to the Hon\'ble President of the Constituent Assembly of India',
    type: 'Constitutional Folio',
    medium: 'Official Gazette Folio',
    date: '21 Feb 1948',
    location: 'GOI Press, New Delhi',
    language: 'English',
    script: 'Legal Monotype',
    institution: 'Parliament of India Digital Library',
    source: 'Constituent Assembly Debates (Official Report)',
    rights: 'Government of India — Public Record',
    verification: 'Verified',
    verificationState: 'Verified',
    verified: true,
    year: '1948',
    category: 'Constituent Assembly Debates',
    sha256: 'b7a8c9d0e1f234567890abcdef1234567890abcdef1234567890abcdef123456'
  },
  {
    id: 'ADHA-MSS-1956-BHD',
    title: 'Buddha and His Dhamma — Typewritten Final Manuscript with Marginal Notes',
    subtitle: 'Original annotated authorial typescript written during final years at Alipur Road',
    type: 'Annotated Manuscript',
    medium: 'Typewriter on Bond',
    date: 'November 1956',
    location: 'Alipur Road, Delhi',
    language: 'English / Pali Gloss',
    script: 'Remington Type Typeface',
    institution: 'National Archives of India',
    source: 'National Archives of India — Abhilekh Patal',
    rights: 'Public Domain',
    verification: 'Preserved Master',
    verificationState: 'Verified',
    verified: true,
    year: '1956',
    category: 'Legal Manuscripts',
    sha256: 'c0d1e2f3a4b567890123456789abcdef0123456789abcdef0123456789abcdef'
  },
  {
    id: 'ADHA-AUD-1956-BBC',
    title: 'BBC Radio London Broadcast on Indian Democracy & Social Justice',
    subtitle: 'Audio recording of Dr. Ambedkar interviewed during his visit to London',
    type: 'Audio Recording',
    medium: '78 RPM Vinyl / Magnetic Reel',
    date: '29 Feb 1956',
    location: 'BBC Bush House, London',
    language: 'English',
    script: 'Spoken Audio',
    institution: 'All India Radio Archives',
    source: 'All India Radio Archives — Prasar Bharati',
    rights: 'Not yet catalogued',
    verification: 'Digitized Audio',
    verificationState: 'Pending Review',
    verified: true,
    year: '1956',
    category: 'Writings & Speeches',
    sha256: 'e5f67890123456789abcdef0123456789abcdef0123456789abcdef012345678'
  }
];

export const DOCUMENT_DETAIL_DATA = {
  id: 'ADHA-DOC-001',
  accessionNumber: 'ADHA-DOC-001',
  title: 'Annihilation of Caste: The Annotated Critical Edition',
  shortTitle: 'Annihilation of Caste (1936/2014)',
  curatorSignoff: 'PROF. S. THORAT / DR. K. G. RAMARAO',
  curatorialNote: 'Critical edition of Dr. B.R. Ambedkar\'s 1936 undelivered presidential address for the Jat-Pat-Todak Mandal of Lahore, featuring prefaces from 1937 and 1944, the Mahatma Gandhi debate, and annotations by S. Anand.',
  
  metadata: {
    formalTitle: 'Annihilation of Caste: An Undelivered Speech (1936) with Prefaces & Gandhi Debate',
    author: 'Dr. Bhimrao Ramji Ambedkar, M.A., Ph.D., D.Sc., Barrister-at-Law',
    dateOfImprint: '15 May 1936 (First Ed) / 1937 / 1944 / 2014',
    extentFormat: '389 pp., Octavo (Annotated Critical Edition)',
    language: 'English (with Sanskrit Shlokas & Devanagari Gloss)',
    publisherPress: 'Jat-Pat-Todak Mandal (1936) / Navayana & Verso Books (2014)',
    source: 'Dr. Ambedkar Foundation — Writings and Speeches, Vol. 1',
    rights: 'Public Domain (Original Text) / Scholarly Repository License',
    preservationSpec: '1200 DPI TIFF Raw Uncompressed Master • Archival Vault NAI-AMB-001',
    cryptographicChecksum: 'SHA-256: a9b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0'
  },

  pagesList: [
    { pageNum: 1, label: 'Cover', title: 'Book Cover Art' },
    { pageNum: 4, label: 'p. 4 ★', title: '1936 Title Page Facsimile' },
    { pageNum: 8, label: 'p. 8', title: 'Table of Contents' },
    { pageNum: 145, label: 'p. 145', title: 'Epigraphs (Buddha & Drummond)' },
    { pageNum: 146, label: 'p. 146 ★', title: 'Preface to Second Edition (1937)' },
    { pageNum: 148, label: 'p. 148', title: 'Preface to Third Edition (1944)' },
    { pageNum: 149, label: 'p. 149', title: 'Prologue — Sant Ram Letter' },
    { pageNum: 168, label: 'p. 168 ★', title: 'Speech Section 1 — Address to Mandal' },
    { pageNum: 184, label: 'p. 184 ★', title: 'Speech Section 4 — Division of Labourers' },
    { pageNum: 200, label: 'p. 200 ★', title: 'Speech Section 14 — Liberty, Equality, Fraternity' },
    { pageNum: 283, label: 'p. 283', title: 'Gandhi: A Vindication of Caste' },
    { pageNum: 296, label: 'p. 296 ★', title: 'Ambedkar: A Reply to the Mahatma' },
    { pageNum: 322, label: 'p. 322', title: 'A Note on the Poona Pact' }
  ],

  pagesData: {
    1: {
      pageNum: 1,
      sectionType: 'cover',
      header: 'CRITICAL EDITION COVER',
      title: 'Annihilation of Caste',
      subtitle: 'B.R. AMBEDKAR',
      extraHeader: 'The Doctor and the Saint — An introduction by ARUNDHATI ROY',
      scanBg: 'bg-[#009ee3]',
      scanStyle: 'cover-art',
      transcription: {
        layer: 'Cover Art Metadata',
        engine: 'Archival Image Processor v5.2',
        confidence: '100%',
        header: 'BOOK COVER ARTWORK & CATALOGUE IMPRINT',
        chapter: 'FRONT COVER',
        sectionTitle: 'Annihilation of Caste: Critical Edition',
        clause1: {
          title: '[Publication Summary]',
          body: 'Annihilation of Caste by Dr. B.R. Ambedkar. Includes "The Doctor and the Saint", a book-length introduction by Arundhati Roy, and extensive annotations by S. Anand. Published by Verso (London/New York) & Navayana (New Delhi).'
        },
        clause2: {
          title: '[Archival Provenance]',
          body: 'Digitized from the master hardcover edition held at the National Archives of India under accession code ADHA-DOC-001.'
        },
        doctrinalFramework: {
          badge: 'Iconic Work',
          title: 'Architectural Significance',
          quote: '"Annihilation of Caste is Dr. B.R. Ambedkar\'s most radical text — an uncompromising indictment of the caste system and Hindu scriptural authority."',
          citation: '— S. Anand, Editor\'s Note'
        },
        footnotes: [
          { num: '1', title: 'Cover Artwork:', text: 'Cover illustration by Golak Khandual depicting the silhouette of Dr. B.R. Ambedkar pointing towards equality.' }
        ]
      }
    },
    4: {
      pageNum: 4,
      sectionType: 'facsimile',
      header: 'ORIGINAL 1936 IMPRINT FACSIMILE',
      title: 'ANNIHILATION OF CASTE',
      subtitle: 'SPEECH PREPARED BY Dr. B. R. Ambedkar M.A., Ph.D., D.Sc., Barrister-at-Law',
      extraHeader: 'FOR The Annual Conference of the JAT-PAT-TODAK MANDAL OF LAHORE BUT NOT DELIVERED',
      scanBg: 'bg-[#EAE4D7]',
      scanStyle: 'vintage-paper',
      scanBody: `Owing to the cancellation of the Conference by the Reception Committee on the ground that the views expressed in the speech would be unbearable to the Conference.

15th May 1936                Price As. 8/-`,
      transcription: {
        layer: 'Layer: 1936 Imprint',
        engine: 'HTR Archival Tesseract v5.2',
        confidence: '99.1%',
        header: 'HISTORIC FIRST EDITION FACSIMILE (BOMBAY, 15 MAY 1936)',
        chapter: 'TITLE PAGE',
        sectionTitle: 'Original Printed Speech Facsimile',
        clause1: {
          title: '[Original Title Imprint]',
          body: 'ANNIHILATION OF CASTE — SPEECH PREPARED BY Dr. B. R. Ambedkar M.A., Ph.D., D.Sc., Barrister-at-Law FOR The Annual Conference of the JAT-PAT-TODAK MANDAL OF LAHORE BUT NOT DELIVERED.'
        },
        clause2: {
          title: '[Publication Note]',
          body: 'Owing to the cancellation of the Conference by the Reception Committee on the ground that the views expressed in the speech would be unbearable to the Conference. Published in Bombay on 15th May 1936. Price: 8 Annas.'
        },
        doctrinalFramework: {
          badge: 'Historical Context',
          title: 'Historical Proclamation',
          quote: '"In May 1936, Ambedkar printed 1,500 copies of the text of his speech at his own expense after the Jat-Pat-Todak Mandal withdrew its invitation."',
          citation: '— Archival Registry Records (1936)'
        },
        footnotes: [
          { num: '1', title: 'Price Notation:', text: 'Price marked 8 Annas (Half Rupee). Gandhi famously commented in Harijan that Ambedkar should have priced it at 2 or 4 annas to reach wider readers.' }
        ]
      }
    },
    8: {
      pageNum: 8,
      sectionType: 'toc',
      header: 'TABLE OF CONTENTS',
      title: 'Contents',
      subtitle: 'Annihilation of Caste — Critical Edition',
      scanBg: 'bg-[#FAF6EE]',
      scanStyle: 'printed-page',
      scanBody: `Editor's Note
The Doctor and the Saint (Arundhati Roy)

Annihilation of Caste
1. Preface to Second Edition, 1937
2. Preface to Third Edition, 1944
3. Prologue
4. Annihilation of Caste: An Undelivered Speech, 1936

The Ambedkar–Gandhi debate
5. A Vindication of Caste by Mahatma Gandhi
6. Sant Ram responds to Gandhi
7. A Reply to the Mahatma by B.R. Ambedkar

A Note on the Poona Pact
Bibliography | Acknowledgements | Index`,
      transcription: {
        layer: 'Layer: Index & Structure',
        engine: 'HTR Archival Tesseract v5.2',
        confidence: '99.5%',
        header: 'MASTER TABLE OF CONTENTS',
        chapter: 'VOLUME STRUCTURE',
        sectionTitle: 'Contents & Structural Navigation',
        clause1: {
          title: '[Section Overview]',
          body: 'The volume contains: Editor\'s Note by S. Anand; "The Doctor and the Saint" by Arundhati Roy; Annihilation of Caste (Prefaces to 1937 & 1944 editions, Prologue, and Undelivered Speech of 1936); The Ambedkar-Gandhi Debate; and A Note on the Poona Pact.'
        },
        clause2: {
          title: '[Navigational Aid]',
          body: 'All sections are cross-indexed with original page numbers and verified against the 1936 first edition, 1937 second edition, and 1944 third edition imprints.'
        },
        doctrinalFramework: {
          badge: 'Structure',
          title: 'Debate Architecture',
          quote: '"The Ambedkar-Gandhi debate over Annihilation of Caste remains one of the defining intellectual controversies of modern Indian history."',
          citation: '— ADHA Curatorial Board Notes'
        },
        footnotes: [
          { num: '1', title: 'Textual History:', text: 'First published May 1936; 2nd edition published May 1937 with Gandhi\'s review and Ambedkar\'s reply; 3rd edition published Dec 1944.' }
        ]
      }
    },
    145: {
      pageNum: 145,
      sectionType: 'epigraph',
      header: 'BOOK EPIGRAPHS',
      title: 'Epigraphs',
      subtitle: 'Opening Inscriptions by Dr. B.R. Ambedkar',
      scanBg: 'bg-[#FAF6EE]',
      scanStyle: 'printed-page',
      scanBody: `Know truth as truth and untruth as untruth. — Buddha

He that will not reason is a bigot. He that cannot reason is a fool. He that dare not reason is a slave. — H. Drummond`,
      transcription: {
        layer: 'Layer: Ver. 5.2',
        engine: 'HTR Archival Tesseract v5.2',
        confidence: '99.8%',
        header: 'EPIGRAPHS ADDED TO THE 1937 EDITION',
        chapter: 'OPENING INSCRIPTIONS',
        sectionTitle: 'Philosophical Foundations',
        clause1: {
          title: '[Buddhist Epigraph]',
          body: '"Know truth as truth and untruth as untruth." — Gautama Buddha (Verse 12 of The Dhammapada & Sutta Nipata).'
        },
        clause2: {
          title: '[Rationalist Epigraph]',
          body: '"He that will not reason is a bigot. He that cannot reason is a fool. He that dare not reason is a slave." — Sir William Drummond (Preface to Academical Questions, 1805).'
        },
        doctrinalFramework: {
          badge: 'Rationalism',
          title: 'Primacy of Reason',
          quote: '"Ambedkar placed rational inquiry and moral truth at the very center of his assault on scriptural orthodoxy."',
          citation: '— S. Anand, Note a (p. 160)'
        },
        footnotes: [
          { num: 'a', title: 'Source Note:', text: 'Added by Ambedkar to the title page of the 1937 second edition. Drummond\'s quote is from Sir William Drummond (Scottish diplomat and philosopher, 1805).' }
        ]
      }
    },
    146: {
      pageNum: 146,
      sectionType: 'preface',
      header: 'PREFACE TO SECOND EDITION (1937)',
      title: 'Preface to the Second Edition, 1937',
      subtitle: 'Dr. B.R. Ambedkar (15 May 1937, Rajgriha, Dadar, Bombay)',
      scanBg: 'bg-[#FAF6EE]',
      scanStyle: 'printed-page',
      scanBody: `The speech prepared by me for the Jat-Pat Todak Mandal of Lahore has had an astonishingly warm reception from the Hindu public for whom it was primarily intended. The English edition of one thousand five hundred copies was exhausted within two months of its publication. It has been translated into Gujarati and Tamil. It is being translated into Marathi, Hindi, Punjabi and Malayalam...

To this edition I have added two appendices. I have collected in Appendix I the two articles written by Mr Gandhi by way of review of my speech in the Harijan, and his letter to Mr Sant Ram... In Appendix II, I have printed my views in reply to the articles of Mr Gandhi...

...I shall be satisfied if I make the Hindus realise that they are the sick men of India, and that their sickness is causing danger to the health and happiness of other Indians.

B.R. AMBEDKAR`,
      transcription: {
        layer: 'Layer: Ver. 5.2',
        engine: 'HTR Archival Tesseract v5.2',
        confidence: '99.4%',
        header: 'AUTHORIAL PREFACE TO THE SECOND EDITION',
        chapter: 'PREFACE — 1937 EDITION',
        sectionTitle: 'Reception & Appendices',
        clause1: {
          title: '[Public Reception & Translations]',
          body: 'The speech prepared by me for the Jat-Pat Todak Mandal of Lahore has had an astonishingly warm reception from the Hindu public for whom it was primarily intended. The English edition of 1,500 copies was exhausted within two months. It has been translated into Gujarati and Tamil, and is being translated into Marathi, Hindi, Punjabi and Malayalam.'
        },
        clause2: {
          title: '[The "Sick Men of India" Metaphor]',
          body: 'The world owes much to rebels who would dare to argue in the face of the pontiff and insist that he is not infallible... I shall be satisfied if I make the Hindus realise that they are the sick men of India, and that their sickness is causing danger to the health and happiness of other Indians.'
        },
        doctrinalFramework: {
          badge: 'Core Thesis',
          title: 'Rebellion Against Orthodoxy',
          quote: '"The world owes much to rebels who would dare to argue in the face of the pontiff and insist that he is not infallible."',
          citation: '— Dr. B.R. Ambedkar, Preface to Second Edition (1937)'
        },
        footnotes: [
          { num: 'b', title: 'Jat-Pat Todak Mandal:', text: 'Forum for the Break-up of Caste, founded in Lahore in 1922 by Arya Samaj reformers including Sant Ram and Bhai Parmanand.' },
          { num: 'c', title: 'Harijan Reviews:', text: 'Refers to Gandhi\'s two-part essay "Dr Ambedkar\'s Indictment" published in Harijan on 11 July and 18 July 1936.' }
        ]
      }
    },
    148: {
      pageNum: 148,
      sectionType: 'preface',
      header: 'PREFACE TO THIRD EDITION (1944)',
      title: 'Preface to the Third Edition, 1944',
      subtitle: 'Dr. B.R. Ambedkar (1 December 1944, 22 Prithviraj Road, New Delhi)',
      scanBg: 'bg-[#FAF6EE]',
      scanStyle: 'printed-page',
      scanBody: `The second edition of this essay appeared in 1937, and was exhausted within a very short period. A new edition has been in demand for a long time. It was my intention to recast the essay so as to incorporate into it another essay of mine called "Castes in India: Their Mechanism, Genesis and Development," which appeared in the issue of the Indian Antiquary journal for May 1917. But as I could not find time, and as there is very little prospect of my being able to do so, and as the demand for it from the public is very insistent, I am content to let this be a mere reprint of the second edition.

I am glad to find that this essay has become so popular, and I hope that it will serve the purpose for which it was intended.

B.R. AMBEDKAR
22, Prithviraj Road, New Delhi
1 December 1944`,
      transcription: {
        layer: 'Layer: Ver. 5.2',
        engine: 'HTR Archival Tesseract v5.2',
        confidence: '99.6%',
        header: 'AUTHORIAL PREFACE TO THE THIRD EDITION',
        chapter: 'PREFACE — 1944 EDITION',
        sectionTitle: 'Reprint Note & Planned Expansion',
        clause1: {
          title: '[Planned Inclusion of 1917 Columbia Paper]',
          body: 'It was my intention to recast the essay so as to incorporate into it another essay of mine called "Castes in India: Their Mechanism, Genesis and Development," which appeared in the Indian Antiquary journal for May 1917. But as I could not find time, I am content to let this be a mere reprint of the second edition.'
        },
        clause2: {
          title: '[Enduring Popularity]',
          body: 'I am glad to find that this essay has become so popular, and I hope that it will serve the purpose for which it was intended.'
        },
        doctrinalFramework: {
          badge: 'Textual Lineage',
          title: 'Enduring Legacy',
          quote: '"By 1944, Annihilation of Caste had established itself as a classic text of modern political theory, constantly in demand across India."',
          citation: '— S. Anand, Note f (p. 162)'
        },
        footnotes: [
          { num: 'f', title: 'Castes in India (1917):', text: 'Ambedkar\'s landmark paper presented at Columbia University in May 1916 and published in Indian Antiquary in May 1917.' }
        ]
      }
    },
    149: {
      pageNum: 149,
      sectionType: 'prologue',
      header: 'PROLOGUE — CORRESPONDENCE',
      title: 'Prologue: Letter from Sant Ram (12 Dec 1935)',
      subtitle: 'Secretary, Jat-Pat Todak Mandal, Lahore',
      scanBg: 'bg-[#FAF6EE]',
      scanStyle: 'printed-page',
      scanBody: `On 12 December 1935, I received the following letter from Mr Sant Ram, the secretary of the Jat-Pat Todak Mandal:

"My dear Doctor Saheb,
Many thanks for your kind letter of the 5th December... You are a great thinker, and it is my well-considered opinion that none else has studied the problem of caste so deeply as you have...

I am now very anxious to read the exposition of your new formula—'It is not possible to break caste without annihilating the religious notions on which it, the caste system, is founded.' Please do explain it at length...

Our executive committee persists in having you as our president for our annual conference..."`,
      transcription: {
        layer: 'Layer: Ver. 5.2',
        engine: 'HTR Archival Tesseract v5.2',
        confidence: '98.9%',
        header: 'PROLOGUE — CORRESPONDENCE WITH LAHORE MANDAL',
        chapter: 'PROLOGUE',
        sectionTitle: 'Invitation to Lahore & The New Formula',
        clause1: {
          title: '[Sant Ram\'s Invitation]',
          body: 'You are a great thinker, and it is my well-considered opinion that none else has studied the problem of caste so deeply as you have... I am now very anxious to read the exposition of your new formula — "It is not possible to break caste without annihilating the religious notions on which it, the caste system, is founded."'
        },
        clause2: {
          title: '[Ambedkar\'s Initial Hesitation]',
          body: 'The Jat-Pat Todak Mandal is an organisation of caste-Hindu social reformers... As a rule, I do not like to take any part in a movement which is carried on by caste Hindus... In the end I agreed to preside.'
        },
        doctrinalFramework: {
          badge: 'Key Thesis',
          title: 'The Core Premise',
          quote: '"It is not possible to break caste without annihilating the religious notions on which the caste system is founded."',
          citation: '— Dr. B.R. Ambedkar, Letter to Sant Ram (5 Dec 1935)'
        },
        footnotes: [
          { num: 'g', title: 'Date Correction:', text: '12 December 1935 marked the initial formal letter inviting Ambedkar to deliver the presidential address in Lahore.' },
          { num: 'h', title: 'Kranti Magazine:', text: 'Urdu monthly magazine edited by Sant Ram from Lahore reporting on anti-caste activities.' }
        ]
      }
    },
    168: {
      pageNum: 168,
      sectionType: 'speech',
      header: 'SPEECH — SECTION 1',
      title: 'Annihilation of Caste: An Undelivered Speech, 1936',
      subtitle: 'Section 1.1 – 1.2',
      scanBg: 'bg-[#FAF6EE]',
      scanStyle: 'printed-page',
      scanBody: `1.1 Friends, I am really sorry for the members of the Jat-Pat Todak Mandal who have so very kindly invited me to preside over this conference. I am sure they will be asked many questions for having selected me as the president. The Mandal will be asked to explain as to why it has imported a man from Bombay to preside over a function which is held in Lahore. I believe the Mandal could easily have found someone better qualified than myself to preside on the occasion. I have criticised the Hindus. I have questioned the authority of the Mahatma whom they revere. They hate me. To them I am a snake in their garden.

1.2 The Mandal may be asked to explain why it has disobeyed the shastric injunction in selecting the president. According to the shastras, the Brahmin is appointed to be the guru for the three varnas. (Varnanam Brahmano Guru) is a direction of the shastras. Ramdas, a Brahmin saint from Maharashtra... asks, can we accept an antyaja to be our guru because he is a pandit? He gives an answer in the negative.`,
      transcription: {
        layer: 'Layer: Ver. 5.2',
        engine: 'HTR Archival Tesseract v5.2',
        confidence: '99.2%',
        header: 'ANNIHILATION OF CASTE — UNDELIVERED SPEECH (1936)',
        chapter: 'SECTION 1',
        sectionTitle: 'Address to the Conference & Shastric Injunctions',
        clause1: {
          title: '[Section 1.1 — "A Snake in Their Garden"]',
          body: 'I have criticised the Hindus. I have questioned the authority of the Mahatma whom they revere. They hate me. To them I am a snake in their garden. The Mandal will no doubt be asked by the politically minded Hindus to explain why it has called me to fill this place of honour. It is an act of great daring.'
        },
        clause2: {
          title: '[Section 1.2 — Shastric Prohibition of Non-Brahmin Guru]',
          body: 'According to the shastras, the Brahmin is appointed to be the guru for the three varnas (Varnanam Brahmano Guru — Manusmriti 10.3). Ramdas, a Brahmin saint from Maharashtra, asks in his Dasbodh: Can we accept an antyaja (Untouchable) to be our guru because he is a pandit? He gives an answer in the negative.'
        },
        doctrinalFramework: {
          badge: 'Audacious Speech',
          title: 'Opening Salvo',
          quote: '"I have questioned the authority of the Mahatma whom they revere. They hate me. To them I am a snake in their garden."',
          citation: '— Dr. B.R. Ambedkar, Annihilation of Caste, Section 1.1'
        },
        footnotes: [
          { num: '1', title: 'Manusmriti 10.3:', text: '"Varnanam Brahmano Guru" — Among varnas, the Brahman is the teacher/preceptor. (Tr. Bibek Debroy).' },
          { num: '2', title: 'Ramdas (1608–81):', text: '17th-century Brahmin saint of Maharashtra, author of Dasbodh, coeval of Maratha king Shivaji.' }
        ]
      }
    },
    184: {
      pageNum: 184,
      sectionType: 'speech',
      header: 'SPEECH — SECTION 4',
      title: 'Division of Labour vs. Division of Labourers',
      subtitle: 'Section 4.1 – 4.3',
      scanBg: 'bg-[#FAF6EE]',
      scanStyle: 'printed-page',
      scanBody: `4.1 It is a pity that caste even today has its defenders. The defences are many. It is defended on the ground that the caste system is but another name for division of labour; and if division of labour is a necessary feature of every civilised society, then it is argued that there is nothing wrong in the caste system. Now the first thing that is to be urged against this view is that the caste system is not merely a division of labour. It is also a division of labourers.

Civilised society undoubtedly needs division of labour. But in no civilised society is division of labour accompanied by this unnatural division of labourers into watertight compartments. The caste system is not merely a division of labourers—which is quite different from division of labour—it is a hierarchy in which the divisions of labourers are graded one above the other.

4.2 This division of labour is not spontaneous; it is not based on natural aptitudes. Social and individual efficiency requires us to develop the capacity of an individual to the point of competency to choose and to make his own career...`,
      transcription: {
        layer: 'Layer: Ver. 5.2',
        engine: 'HTR Archival Tesseract v5.2',
        confidence: '99.7%',
        header: 'ANNIHILATION OF CASTE — UNDELIVERED SPEECH (1936)',
        chapter: 'SECTION 4',
        sectionTitle: 'Critique of Caste as Division of Labour',
        clause1: {
          title: '[Section 4.1 — Division of Labourers]',
          body: 'The first thing that is to be urged against this view is that the caste system is not merely a division of labour. It is also a division of labourers. Civilised society undoubtedly needs division of labour. But in no civilised society is division of labour accompanied by this unnatural division of labourers into watertight compartments.'
        },
        clause2: {
          title: '[Section 4.2 — Violation of Natural Aptitude]',
          body: 'This division of labour is not spontaneous; it is not based on natural aptitudes. Social and individual efficiency requires us to develop the capacity of an individual to the point of competency to choose and to make his own career. This principle is violated in the caste system.'
        },
        doctrinalFramework: {
          badge: 'Philosophical Landmark',
          title: 'Not Merely Division of Labour',
          quote: '"The caste system is not merely a division of labour. It is also a division of labourers — a hierarchy in which the divisions of labourers are graded one above the other."',
          citation: '— Dr. B.R. Ambedkar, Annihilation of Caste, Section 4.1'
        },
        footnotes: [
          { num: '39', title: 'Deweyan Influence:', text: 'Ambedkar here refashions the pragmatic liberalism of his teacher John Dewey (Columbia University) into a critique of caste hierarchy.' }
        ]
      }
    },
    200: {
      pageNum: 200,
      sectionType: 'speech',
      header: 'SPEECH — SECTION 14',
      title: 'Liberty, Equality, Fraternity & Democracy',
      subtitle: 'Section 14.1 – 14.2',
      scanBg: 'bg-[#FAF6EE]',
      scanStyle: 'printed-page',
      scanBody: `14.1 I would not be surprised if some of you have grown weary listening to this tiresome tale of the sad effects which caste has produced... What is your ideal society if you do not want caste, is a question that is bound to be asked of you. If you ask me, my ideal would be a society based on liberty, equality, and fraternity. And why not?

14.2 What objection can there be to fraternity? I cannot imagine any. An ideal society should be mobile, should be full of channels for conveying a change taking place in one part to other parts. In an ideal society there should be many interests consciously communicated and shared. There should be varied and free points of contact with other modes of association. In other words there must be social endosmosis.

This is fraternity, which is only another name for democracy. Democracy is not merely a form of government. It is primarily a mode of associated living, of conjoint communicated experience. It is essentially an attitude of respect and reverence towards fellow men.`,
      transcription: {
        layer: 'Layer: Ver. 5.2',
        engine: 'HTR Archival Tesseract v5.2',
        confidence: '99.8%',
        header: 'ANNIHILATION OF CASTE — UNDELIVERED SPEECH (1936)',
        chapter: 'SECTION 14',
        sectionTitle: 'The Constructive Ideal & Democracy',
        clause1: {
          title: '[Section 14.1 — Triad of Liberty, Equality, Fraternity]',
          body: 'If you ask me, my ideal would be a society based on liberty, equality, and fraternity. And why not?'
        },
        clause2: {
          title: '[Section 14.2 — Social Endosmosis & Definition of Democracy]',
          body: 'In an ideal society there must be social endosmosis. This is fraternity, which is only another name for democracy. Democracy is not merely a form of government. It is primarily a mode of associated living, of conjoint communicated experience. It is essentially an attitude of respect and reverence towards fellow men.'
        },
        doctrinalFramework: {
          badge: 'Definition of Democracy',
          title: 'Mode of Associated Living',
          quote: '"Democracy is not merely a form of government. It is primarily a mode of associated living, of conjoint communicated experience. It is essentially an attitude of respect and reverence towards fellow men."',
          citation: '— Dr. B.R. Ambedkar, Annihilation of Caste, Section 14.2'
        },
        footnotes: [
          { num: '79', title: 'Social Endosmosis:', text: 'Concept borrowed from John Dewey, using a biological term to describe the fluid transmission of values and experiences between social groups.' },
          { num: '80', title: 'Conjoint Experience:', text: 'Direct quotation from John Dewey\'s Democracy and Education (1916, Chapter 7).' }
        ]
      }
    },
    283: {
      pageNum: 283,
      sectionType: 'gandhi',
      header: 'GANDHI DEBATE — PART 1',
      title: 'A Vindication of Caste by Mahatma Gandhi',
      subtitle: 'Dr. Ambedkar\'s Indictment — 1 (Harijan, 11 July 1936)',
      scanBg: 'bg-[#FAF6EE]',
      scanStyle: 'printed-page',
      scanBody: `1.1 The readers will recall the fact that Dr Ambedkar was to have presided last May at the annual conference of the Jat-Pat Todak Mandal of Lahore. But the conference itself was cancelled because Dr Ambedkar’s address was found by the reception committee to be unacceptable... Whatever label he wears in future, Dr Ambedkar is not the man to allow himself to be forgotten.

1.3 No reformer can ignore the address. The orthodox will gain by reading it. Dr Ambedkar is a challenge to Hinduism. Brought up as a Hindu, educated by a Hindu potentate, he has become so disgusted with the so-called savarna Hindus or the treatment that he and his people have received at their hands that he proposes to leave not only them but the very religion that is his and their common heritage.`,
      transcription: {
        layer: 'Layer: Gandhi Review',
        engine: 'HTR Archival Tesseract v5.2',
        confidence: '99.1%',
        header: 'THE AMBEDKAR–GANDHI DEBATE (APPENDIX I)',
        chapter: 'PART 1',
        sectionTitle: 'Dr Ambedkar\'s Indictment — 1 (M.K. Gandhi)',
        clause1: {
          title: '[Section 1.1 — "Not the Man to Be Forgotten"]',
          body: 'The committee appears to have deprived the public of an opportunity of listening to the original views of a man who has carved out for himself a unique position in society. Whatever label he wears in future, Dr Ambedkar is not the man to allow himself to be forgotten.'
        },
        clause2: {
          title: '[Section 1.3 — A Challenge to Hinduism]',
          body: 'No reformer can ignore the address. The orthodox will gain by reading it. Dr Ambedkar is a challenge to Hinduism... He has transferred to that religion his disgust against a part of its professors.'
        },
        doctrinalFramework: {
          badge: 'Gandhi\'s Tribute',
          title: 'Unique Position in Society',
          quote: '"Whatever label he wears in future, Dr Ambedkar is not the man to allow himself to be forgotten."',
          citation: '— M.K. Gandhi, Harijan (11 July 1936)'
        },
        footnotes: [
          { num: '1', title: 'Publication:', text: 'First published in Harijan on 11 July 1936; included by Ambedkar as Appendix I in the 1937 edition.' }
        ]
      }
    },
    296: {
      pageNum: 296,
      sectionType: 'reply',
      header: 'AMBEDKAR REPLY — PART 2',
      title: 'A Reply to the Mahatma by B.R. Ambedkar',
      subtitle: 'Section 1.1 – 1.2 (Appendix II, 1937 Edition)',
      scanBg: 'bg-[#FAF6EE]',
      scanStyle: 'printed-page',
      scanBody: `1.1 I appreciate greatly the honour done me by the Mahatma in taking notice in his Harijan of the speech on caste which I had prepared for the Jat-Pat Todak Mandal. From a perusal of his review of my speech, it is clear that the Mahatma completely dissents from the views I have expressed on the subject of caste. I am not in the habit of entering into controversy with my opponents... Had my opponent been some mean and obscure person I would not have pursued him. But my opponent being the Mahatma himself, I feel I must attempt to meet the case to the contrary which he has sought to put forth.

1.2 While I appreciate the honour he has done me, I must confess to a sense of surprise on finding that of all people the Mahatma should accuse me of a desire to seek publicity... Whatever the Mahatma may choose to say, my object in publishing the speech was to provoke the Hindus to think, and to take stock of their position.`,
      transcription: {
        layer: 'Layer: Ver. 5.2',
        engine: 'HTR Archival Tesseract v5.2',
        confidence: '99.5%',
        header: 'AMBEDKAR\'S REJOINDER TO MAHATMA GANDHI (APPENDIX II)',
        chapter: 'SECTION 1',
        sectionTitle: 'Rebuttal of Gandhi\'s Review',
        clause1: {
          title: '[Section 1.1 — Meeting the Opponent]',
          body: 'Had my opponent been some mean and obscure person I would not have pursued him. But my opponent being the Mahatma himself, I feel I must attempt to meet the case to the contrary which he has sought to put forth.'
        },
        clause2: {
          title: '[Section 1.2 — Purpose of Publication]',
          body: 'Whatever the Mahatma may choose to say, my object in publishing the speech was to provoke the Hindus to think, and to take stock of their position. I have never hankered for publicity... Surely not those who, like the Mahatma, live in glass houses.'
        },
        doctrinalFramework: {
          badge: 'Rejoinder',
          title: 'Provoking Thought',
          quote: '"My object in publishing the speech was to provoke the Hindus to think, and to take stock of their position."',
          citation: '— Dr. B.R. Ambedkar, A Reply to the Mahatma (1937)'
        },
        footnotes: [
          { num: '1', title: 'Textual Inclusion:', text: 'Ambedkar added this exhaustive 11-section reply to Gandhi as Appendix II in the 1937 second edition of Annihilation of Caste.' }
        ]
      }
    },
    322: {
      pageNum: 322,
      sectionType: 'poona-pact',
      header: 'SCHOLARLY ESSAY — POONA PACT',
      title: 'A Note on the Poona Pact by S. Anand',
      subtitle: 'Critical Context of the 1932 Fast & Electoral History',
      scanBg: 'bg-[#FAF6EE]',
      scanStyle: 'printed-page',
      scanBody: `If the Communal Award of 16 August 1932 was a victory of sorts for those who sought to take social difference seriously in India, the Poona Pact of 24 September 1932 was a defeat. At a time of urgent political and ideological contestation over the future of India, the pact abruptly came in the way of more ambitious ways of fashioning a democracy that would suit a subcontinent made up essentially of caste, religious, regional and linguistic minorities, what B.R. Ambedkar termed a "congeries of communities".

Ambedkar, with radical foresight, was trying to stymie the adoption of a first-past-the-post system, which he feared in the Indian context would result in a Hindu communal majority parading as a political majority...`,
      transcription: {
        layer: 'Layer: Scholarly Essay',
        engine: 'HTR Archival Tesseract v5.2',
        confidence: '99.9%',
        header: 'SCHOLARLY ANNOTATION — THE POONA PACT (1932)',
        chapter: 'HISTORICAL ANALYSIS',
        sectionTitle: 'The Poona Pact & Electoral Representation',
        clause1: {
          title: '[Congeries of Communities]',
          body: 'If the Communal Award of 16 August 1932 was a victory of sorts, the Poona Pact of 24 September 1932 was a defeat. It came in the way of fashioning a democracy suited to a subcontinent made up of minorities — what B.R. Ambedkar termed a "congeries of communities".'
        },
        clause2: {
          title: '[Fear of Majoritarianism]',
          body: 'Ambedkar feared that a simple first-past-the-post electoral system in a caste-divided society would result in a communal majority parading as a political majority without safeguards for Scheduled Castes.'
        },
        doctrinalFramework: {
          badge: 'Historical Essay',
          title: 'Congeries of Communities',
          quote: '"Ambedkar feared that in the Indian context, a first-past-the-post system would result in a Hindu communal majority parading as a political majority."',
          citation: '— S. Anand, A Note on the Poona Pact (p. 322)'
        },
        footnotes: [
          { num: '1', title: 'BAWS Reference:', text: 'BAWS 4, 13 — "India is not a nation, but a congeries of communities."' }
        ]
      }
    }
  },

  heritageGraph: {
    interlinkedSpeeches: [
      { title: 'Speech at Yeola Depressed Classes Conference...', date: '13 October 1935', context: 'Yeola, Nashik' },
      { title: 'Address to the Sikh Prachar Conference...', date: '13–14 April 1936', context: 'Amritsar' },
      { title: 'Speech on the Poona Pact & Communal Award...', date: '25 September 1932', context: 'Bombay' }
    ],
    contemporaryFigures: ['Mahatma Gandhi', 'Sant Ram (Jat-Pat-Todak Mandal)', 'Har Bhagwan', 'Arundhati Roy', 'S. Anand'],
    custodialRepositories: [
      { name: 'National Archives of India', identifier: 'Record Identifier: NAI-DOC-1936-AOC-001' },
      { name: 'Dr. Ambedkar National Memorial', identifier: 'Special Collection (Box 4, Item 1)' }
    ]
  }
};

export const KNOWLEDGE_GRAPH_NODES = {
  center: { id: 'BR_AMBEDKAR', label: 'Dr. B. R. Ambedkar', category: 'Person', details: 'Jurist, Economist, Social Reformer & Chief Architect of the Constitution of India' },
  categories: [
    {
      name: 'Constitutional Documents',
      nodes: [
        { id: 'ADHA-DOC-001', label: 'Annihilation of Caste (1936)', type: 'Document', date: '1936' },
        { id: 'SM_1947', label: 'States & Minorities (1947)', type: 'Document', date: '1947' },
        { id: 'DFT_CON_1948', label: 'Draft Constitution (1948)', type: 'Document', date: '1948' },
        { id: 'HBC_1951', label: 'Hindu Code Bill (1951)', type: 'Document', date: '1951' }
      ]
    },
    {
      name: 'Speeches & Addresses',
      nodes: [
        { id: 'SP_AOC_1936', label: 'Annihilation of Caste Address', type: 'Speech', date: '15 May 1936' },
        { id: 'SP_OBJ_1946', label: 'Objective Resolution Speech', type: 'Speech', date: '17 Dec 1946' },
        { id: 'SP_LAST_1949', label: 'Grammar of Anarchy Speech', type: 'Speech', date: '25 Nov 1949' },
        { id: 'SP_MAHAD_1927', label: 'Mahad Conference Address', type: 'Speech', date: '20 Mar 1927' }
      ]
    },
    {
      name: 'Historical Events',
      nodes: [
        { id: 'EV_MAHAD_1927', label: 'Mahad Satyagraha', type: 'Event', date: '1927' },
        { id: 'EV_POONA_1932', label: 'Poona Pact', type: 'Event', date: '1932' },
        { id: 'EV_CON_1949', label: 'Adoption of Constitution', type: 'Event', date: '1949' }
      ]
    },
    {
      name: 'Legislative Matters',
      nodes: [
        { id: 'LEG_ART15', label: 'Article 15 Anti-Discrimination', type: 'Legislative', date: '1949' },
        { id: 'LEG_ART32', label: 'Article 32 Constitutional Remedies', type: 'Legislative', date: '1949' },
        { id: 'LEG_RUPEE', label: 'Reserve Bank of India Act Framework', type: 'Legislative', date: '1934' }
      ]
    }
  ]
};

export const TIMELINE_EVENTS = [
  {
    year: '1916',
    date: 'May 9, 1916',
    title: 'Castes in India: Their Mechanism, Genesis and Development',
    location: 'Columbia University, New York',
    type: 'Academic Paper',
    description: 'Presented at the Anthropology Seminar of Dr. Alexander Goldenweiser.',
    source: 'Columbia University Archives',
    relatedRecordId: 'ADHA-DIS-1923-LSE'
  },
  {
    year: '1920',
    date: 'Jan 31, 1920',
    title: 'Publication of Mooknayak (Leader of the Voiceless)',
    location: 'Bombay',
    type: 'Periodical',
    description: 'First fortnightly newspaper started to articulate civil liberties and social equality.',
    source: 'Dr. Ambedkar Foundation',
    relatedRecordId: 'ADHA-MAN-1920-MOO'
  },
  {
    year: '1923',
    date: 'March 1923',
    title: 'The Problem of the Rupee Published in London',
    location: 'London',
    type: 'Economic Thesis',
    description: 'P.S. King & Son publishes Dr. Ambedkar\'s seminal thesis on currency stabilization.',
    source: 'Columbia University Rare Book & Manuscript Library',
    relatedRecordId: 'ADHA-DIS-1923-LSE'
  },
  {
    year: '1927',
    date: 'March 20, 1927',
    title: 'Mahad Satyagraha at Chavdar Tale',
    location: 'Mahad, Maharashtra',
    type: 'Historical Event',
    description: 'Movement asserting public water supply access rights as fundamental human rights.',
    source: 'Maharashtra State Archives',
    relatedRecordId: 'ADHA-DEC-1927-MAH'
  },
  {
    year: '1936',
    date: 'May 15, 1936',
    title: 'Annihilation of Caste Published',
    location: 'Bombay',
    type: 'Printed Monograph',
    description: 'First printed edition of the undelivered address for Jat-Pat-Todak Mandal.',
    source: 'Dr. Ambedkar Foundation — Writings and Speeches, Vol. 1',
    relatedRecordId: 'ADHA-DOC-001'
  },
  {
    year: '1946',
    date: 'Dec 17, 1946',
    title: 'Speech on the Objective Resolution',
    location: 'Constituent Assembly, New Delhi',
    type: 'Constitutional Speech',
    description: 'Address advocating strong centralized federation and constitutional democracy.',
    source: 'Constituent Assembly Debates (Official Report)',
    relatedRecordId: 'ADHA-CAD-1946-DEC17'
  },
  {
    year: '1947',
    date: 'April 1947',
    title: 'States and Minorities Memorandum Submitted',
    location: 'New Delhi',
    type: 'Legal Draft',
    description: 'Comprehensive memorandum proposing fundamental rights and state socialism.',
    source: 'Dr. Ambedkar Foundation — Writings and Speeches, Vol. 2',
    relatedRecordId: 'ADHA-PUB-1947-STM'
  },
  {
    year: '1948',
    date: 'Feb 21, 1948',
    title: 'Draft Constitution Presented to President',
    location: 'Constituent Assembly, New Delhi',
    type: 'Constitutional Gazette',
    description: 'Dr. Ambedkar presents the completed Draft Constitution of India.',
    source: 'Constituent Assembly Debates (Official Report)',
    relatedRecordId: 'ADHA-CON-1948-DFT'
  },
  {
    year: '1956',
    date: 'Nov 1956',
    title: 'Completion of The Buddha and His Dhamma',
    location: 'New Delhi',
    type: 'Manuscript Finalization',
    description: 'Final authorial typescript completed shortly before Dr. Ambedkar\'s mahaparinirvana.',
    source: 'National Archives of India — Abhilekh Patal',
    relatedRecordId: 'ADHA-MSS-1956-BHD'
  }
];

export const CONNECTED_INSTITUTIONS = [
  {
    name: 'National Archives of India',
    type: 'National Archive',
    location: 'New Delhi, India',
    status: 'Active',
    collections: 142,
    records: '4,850',
    pending: 12,
    lastSync: '2 minutes ago',
    accessStatus: 'Full Access'
  },
  {
    name: 'Dr. Ambedkar National Memorial',
    type: 'Memorial & Museum',
    location: '26 Alipur Road, New Delhi',
    status: 'Active',
    collections: 88,
    records: '2,940',
    pending: 8,
    lastSync: '15 minutes ago',
    accessStatus: 'Full Access'
  },
  {
    name: 'Columbia University Rare Books & Manuscript Library',
    type: 'University Special Collection',
    location: 'New York, USA',
    status: 'Active',
    collections: 34,
    records: '1,120',
    pending: 4,
    lastSync: '1 hour ago',
    accessStatus: 'Federated Read'
  },
  {
    name: 'Maharashtra State Archives',
    type: 'State Archive',
    location: 'Elphinstone College, Mumbai',
    status: 'Active',
    collections: 95,
    records: '3,540',
    pending: 14,
    lastSync: '34 minutes ago',
    accessStatus: 'Full Access'
  }
];
