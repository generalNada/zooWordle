const flicksShows = [
  {
    ref: 549,
    title: "Cartoons R Fun",
    year: null,
    genre: "Shows",
    collection: null,
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/lre9szmg5hjjpw60z3mhc/CARTOONS_R_FUN.mp4?rlkey=e5cmi4fax0go5zb5oa9f0ypv4&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/lre9szmg5hjjpw60z3mhc/CARTOONS_R_FUN.mp4?rlkey=e5cmi4fax0go5zb5oa9f0ypv4&dl=1",
  },
  {
    ref: 550,
    title: "Chris Rock: Bring the Pain",
    year: 1996,
    genre: "Shows",
    collection: "Standup",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/82i778uwplrt2ddizgbyy/CHRIS_ROCK_BringThePain.mp4?rlkey=ymgbb3i0lx852e4x3ju1sh2it&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/82i778uwplrt2ddizgbyy/CHRIS_ROCK_BringThePain.mp4?rlkey=ymgbb3i0lx852e4x3ju1sh2it&dl=1",
  },
  {
    ref: 551,
    title: "Chris Rock: Never Scared",
    year: 2004,
    genre: "Shows",
    collection: "Standup",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/8vh1oav9069kbumvdj2y4/CHRIS_ROCK_NeverScared.mp4?rlkey=1jk6x5epz0glfl8wwzf318dqd&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/8vh1oav9069kbumvdj2y4/CHRIS_ROCK_NeverScared.mp4?rlkey=1jk6x5epz0glfl8wwzf318dqd&dl=1",
  },
  {
    ref: 552,
    title: "Mansfield Park",
    year: 1999,
    genre: "Shows",
    collection: null,
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/lnv14farlw195fjh5z2yw/MANSFIELD_PARK.mp4?rlkey=h7zmt4k3hq1s618a7j9250f8u&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/lnv14farlw195fjh5z2yw/MANSFIELD_PARK.mp4?rlkey=h7zmt4k3hq1s618a7j9250f8u&dl=1",
  },
  {
    ref: 553,
    title: "Northanger Abbey",
    year: 2007,
    genre: "Shows",
    collection: null,
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/rn8663u6ti4bom1q0jr3y/NORTHANGER_-ABBEY.mp4?rlkey=ck64g49pu08ghszg4dpg7rjf0&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/rn8663u6ti4bom1q0jr3y/NORTHANGER_-ABBEY.mp4?rlkey=ck64g49pu08ghszg4dpg7rjf0&dl=1",
  },
  {
    title: "The Office (UK) - Season 1, Disc 1",
    year: 2001,
    genre: "Shows",
    collection: "The Office",
    ref: 554,
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/fuqh6v4hmo11ef3wc4nhp/THE_OFFICE_S1_D1.mp4?rlkey=18b27ixix3vep0e9nha4g35rm&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/fuqh6v4hmo11ef3wc4nhp/THE_OFFICE_S1_D1.mp4?rlkey=18b27ixix3vep0e9nha4g35rm&dl=1",
  },
  {
    title: "The Office (UK) - Season 1, Disc 2",
    year: 2001,
    genre: "Shows",
    collection: "The Office",
    ref: 555,
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/6rycnho91ekm738x2zn4u/THE_OFFICE_S1_D2.mp4?rlkey=n52bhdr7skbbhrmuft1wr3xc9&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/6rycnho91ekm738x2zn4u/THE_OFFICE_S1_D2.mp4?rlkey=n52bhdr7skbbhrmuft1wr3xc9&dl=1",
  },
  {
    title: "The Office (UK) - Season 2, Disc 1",
    year: 2002,
    genre: "Shows",
    collection: "The Office",
    ref: 556,
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/8od2bss3ezjyw2luuo93v/THE_OFFICE_S2_D1_.mp4?rlkey=ogs77zk66c3dtl2m0t2m5lzz6&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/8od2bss3ezjyw2luuo93v/THE_OFFICE_S2_D1_.mp4?rlkey=ogs77zk66c3dtl2m0t2m5lzz6&dl=1",
  },
  {
    title: "The Office (UK) - The Christmas Special",
    year: 2003,
    genre: "Shows",
    collection: "The Office",
    ref: 557,
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/ewm6oe09yj6yy8vd4n8nm/THE_OFFICE_S2_THE_CHRISTMAS_SPECIA.mp4?rlkey=wrcvofwuloyvd04wvka3pluh9&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/ewm6oe09yj6yyvd4n8nm/THE_OFFICE_S2_THE_CHRISTMAS_SPECIA.mp4?rlkey=wrcvofwuloyvd04wvka3pluh9&dl=1",
  },
  {
    ref: 558,
    title: "Sarah Silverman: Jesus is Magic",
    year: 2005,
    genre: "Shows",
    collection: "Standup",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/yz18ytafbnmttlnv70wws/SARAH_SILVERMAN_JESUS.mp4?rlkey=c8z5o2o20rbu9bg5z9ynjnx8v&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/yz18ytafbnmttlnv70wws/SARAH_SILVERMAN_JESUS.mp4?rlkey=c8z5o2o20rbu9bg5z9ynjnx8v&dl=1",
  },
  {
    title: "True Detective - S1 Episodes 1–3",
    year: 2014,
    genre: "Shows",
    collection: "True Detective",
    ref: 559,
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/ps0n0i9qvl6qabsimkcot/TRUE_DETECTIVE_S1_1-3.mp4?rlkey=3qcc5tjdw2old3858afblc8v3&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/ps0n0i9qvl6qabsimkcot/TRUE_DETECTIVE_S1_1-3.mp4?rlkey=3qcc5tjdw2old3858afblc8v3&dl=1",
  },
  {
    title: "True Detective - S1 Episodes 4–6",
    year: 2014,
    genre: "Shows",
    collection: "True Detective",
    ref: 560,
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/ofgqr6ve7v8dbehf5pgrp/TRUE_DETECTIVE_S1_4-6.mp4?rlkey=av6mqpczxx9nkh7o5flioa356&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/ofgqr6ve7v8dbehf5pgrp/TRUE_DETECTIVE_S1_4-6.mp4?rlkey=av6mqpczxx9nkh7o5flioa356&dl=1",
  },
  {
    ref: 561,
    title: "True Detective - S1 Episodes 7–8",
    year: 2014,
    genre: "Shows",
    collection: "True Detective",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/hxx6a944c7kznwb2eua9h/TRUE_DETECTIVE_S1_7-8.mp4?rlkey=iqjt8l4jnzk2q1rock3gaafqw&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/hxx6a944c7kznwb2eua9h/TRUE_DETECTIVE_S1_7-8.mp4?rlkey=iqjt8l4jnzk2q1rock3gaafqw&dl=1",
  },
  {
    ref: 562,
    title: "Will Ferrell SNL 2",
    year: 2002,
    genre: "Shows",
    collection: "Standup",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/flu4jl9vgigeg1y6hchz5/WILL_FERRELL_SNL2.mp4?rlkey=zmjxy0wxyqk9b4kx2yvdze6y8&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/flu4jl9vgigeg1y6hchz5/WILL_FERRELL_SNL2.mp4?rlkey=zmjxy0wxyqk9b4kx2yvdze6y8&dl=1",
  },
  {
    ref: 563,
    title: "Will Ferrell SNL 1",
    year: 2002,
    genre: "Shows",
    collection: "Standup",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/j0ukpszn5moj1zjc96uqh/WILL_FERRELL_SNL1.mp4?rlkey=54u8fbekrep0osupvhlp003x7&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/j0ukpszn5moj1zjc96uqh/WILL_FERRELL_SNL1.mp4?rlkey=54u8fbekrep0osupvhlp003x7&dl=1",
  },
];
