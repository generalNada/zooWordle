const flicksShows = [
  {
    ref: 1400,
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
    ref: 1401,
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
    ref: 1402,
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
    ref: 1403,
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
    ref: 1404,
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
    ref: 1406,
    title: "The Office (UK) - Season 1, Disc 1",
    year: 2001,
    genre: "Shows",
    collection: "The Office",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/fuqh6v4hmo11ef3wc4nhp/THE_OFFICE_S1_D1.mp4?rlkey=18b27ixix3vep0e9nha4g35rm&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/fuqh6v4hmo11ef3wc4nhp/THE_OFFICE_S1_D1.mp4?rlkey=18b27ixix3vep0e9nha4g35rm&dl=1",
  },
  {
    ref: 1407,
    title: "The Office (UK) - Season 1, Disc 2",
    year: 2001,
    genre: "Shows",
    collection: "The Office",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/6rycnho91ekm738x2zn4u/THE_OFFICE_S1_D2.mp4?rlkey=n52bhdr7skbbhrmuft1wr3xc9&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/6rycnho91ekm738x2zn4u/THE_OFFICE_S1_D2.mp4?rlkey=n52bhdr7skbbhrmuft1wr3xc9&dl=1",
  },
  {
    ref: 1408,
    title: "The Office (UK) - Season 2, Disc 1",
    year: 2002,
    genre: "Shows",
    collection: "The Office",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/8od2bss3ezjyw2luuo93v/THE_OFFICE_S2_D1_.mp4?rlkey=ogs77zk66c3dtl2m0t2m5lzz6&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/8od2bss3ezjyw2luuo93v/THE_OFFICE_S2_D1_.mp4?rlkey=ogs77zk66c3dtl2m0t2m5lzz6&dl=1",
  },
  {
    ref: 1409,
    title: "The Office (UK) - The Christmas Special",
    year: 2003,
    genre: "Shows",
    collection: "The Office",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/ewm6oe09yj6yy8vd4n8nm/THE_OFFICE_S2_THE_CHRISTMAS_SPECIA.mp4?rlkey=wrcvofwuloyvd04wvka3pluh9&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/ewm6oe09yj6yyvd4n8nm/THE_OFFICE_S2_THE_CHRISTMAS_SPECIA.mp4?rlkey=wrcvofwuloyvd04wvka3pluh9&dl=1",
  },
  {
    ref: 1405,
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
    ref: 1410,
    title: "True Detective - S1 Episodes 1–3",
    year: 2014,
    genre: "Shows",
    collection: "True Detective",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/ps0n0i9qvl6qabsimkcot/TRUE_DETECTIVE_S1_1-3.mp4?rlkey=3qcc5tjdw2old3858afblc8v3&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/ps0n0i9qvl6qabsimkcot/TRUE_DETECTIVE_S1_1-3.mp4?rlkey=3qcc5tjdw2old3858afblc8v3&dl=1",
  },
  {
    ref: 1411,
    title: "True Detective - S1 Episodes 4–6",
    year: 2014,
    genre: "Shows",
    collection: "True Detective",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/ofgqr6ve7v8dbehf5pgrp/TRUE_DETECTIVE_S1_4-6.mp4?rlkey=av6mqpczxx9nkh7o5flioa356&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/ofgqr6ve7v8dbehf5pgrp/TRUE_DETECTIVE_S1_4-6.mp4?rlkey=av6mqpczxx9nkh7o5flioa356&dl=1",
  },
  {
    ref: 1412,
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
    ref: 1413,
    title: "Will Ferrell SNL 2",
    year: 2002,
    genre: "Shows",
    collection: ["Standup", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/flu4jl9vgigeg1y6hchz5/WILL_FERRELL_SNL2.mp4?rlkey=zmjxy0wxyqk9b4kx2yvdze6y8&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/flu4jl9vgigeg1y6hchz5/WILL_FERRELL_SNL2.mp4?rlkey=zmjxy0wxyqk9b4kx2yvdze6y8&dl=1",
  },
  {
    ref: 1414,
    title: "Will Ferrell SNL 1",
    year: 2002,
    genre: "Shows",
    collection: ["Standup", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/j0ukpszn5moj1zjc96uqh/WILL_FERRELL_SNL1.mp4?rlkey=54u8fbekrep0osupvhlp003x7&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/j0ukpszn5moj1zjc96uqh/WILL_FERRELL_SNL1.mp4?rlkey=54u8fbekrep0osupvhlp003x7&dl=1",
  },
  {
    ref: 1415,
    title:
      "Strangers with Candy - Retardation: A Celebration - The Unaired Pilot",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/x9otijiwq1wacy38r6uhw/StrangersWithCandyUnairedPilot-YouTube.mp4?rlkey=ifv81p95r8umdnz876gy59h59&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/x9otijiwq1wacy38r6uhw/StrangersWithCandyUnairedPilot-YouTube.mp4?rlkey=ifv81p95r8umdnz876gy59h59&dl=1",
  },
  {
    ref: 1416,
    title: "Strangers with Candy - S1E1 - Old Habits/New Beginnings",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/c7m6fv522ykamo0jmlqh4/StrangersWithCandyS1E1.mp4?rlkey=2upsh3posrang8wdfg4jsw14v&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/c7m6fv522ykamo0jmlqh4/StrangersWithCandyS1E1.mp4?rlkey=2upsh3posrang8wdfg4jsw14v&dl=1",
  },
  {
    ref: 1417,
    title: "Strangers with Candy - S1E2 - A Burden's Burden",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/u7z566i6wfcy6clxzw7jj/StrangersWithCandyS1E2.mp4?rlkey=btox4q1jyjt7b1jlikc54m9a4&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/u7z566i6wfcy6clxzw7jj/StrangersWithCandyS1E2.mp4?rlkey=btox4q1jyjt7b1jlikc54m9a4&dl=1",
  },
  {
    ref: 1418,
    title: "Strangers with Candy - S1E3 - Dreams on the Rocks",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/0qd5b110s9fakzzpqhlqz/StrangersWithCandyS1E3.mp4?rlkey=rjnq2c004r2px40lvmz21ody6&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/0qd5b110s9fakzzpqhlqz/StrangersWithCandyS1E3.mp4?rlkey=rjnq2c004r2px40lvmz21ody6&dl=1",
  },
  {
    ref: 1419,
    title: "Strangers with Candy - S1E4 - Who Wants Cake?",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/b1mc2kfhpcc747jkg28zk/StrangersWithCandyS1E4.mp4?rlkey=pt30rb2qidd9nrzryxy3dld9k&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/b1mc2kfhpcc747jkg28zk/StrangersWithCandyS1E4.mp4?rlkey=pt30rb2qidd9nrzryxy3dld9k&dl=1",
  },
  {
    ref: 1420,
    title: "Strangers with Candy - S1E5 - Bogie Nights",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/znt7qf33hybfwnr35aa46/StrangersWithCandyS1E5.mp4?rlkey=kt3emyhwlom6m6c8lqkon96n6&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/znt7qf33hybfwnr35aa46/StrangersWithCandyS1E5.mp4?rlkey=kt3emyhwlom6m6c8lqkon96n6&dl=1",
  },
  {
    ref: 1421,
    title: "Strangers with Candy - S1E6 - Let Freedom Ring",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/jbh7xrbyrczcxk8o3auwh/StrangersWithCandyS1E6.mp4?rlkey=x021zl0i3pi8z40o0yjwlhdl8&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/jbh7xrbyrczcxk8o3auwh/StrangersWithCandyS1E6.mp4?rlkey=x021zl0i3pi8z40o0yjwlhdl8&dl=1",
  },
  {
    ref: 1422,
    title: "Strangers with Candy - S1E7 - Feather in the Storm",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/il5qx3zj0qasmh5z156f7/StrangersWithCandyS1E7.mp4?rlkey=d6z8kh26fg806vsvfyll0rn38&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/il5qx3zj0qasmh5z156f7/StrangersWithCandyS1E7.mp4?rlkey=d6z8kh26fg806vsvfyll0rn38&dl=1",
  },
  {
    ref: 1423,
    title: "Strangers with Candy - S1E8 - To Be Young, Gifted and Blank",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/1tzk64m7ew2uo3b3al51e/StrangersWithCandyS1E8.mp4?rlkey=ci4za38kbd3rr49kjasqkr2pt&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/1tzk64m7ew2uo3b3al51e/StrangersWithCandyS1E8.mp4?rlkey=ci4za38kbd3rr49kjasqkr2pt&dl=1",
  },
  {
    ref: 1424,
    title: "Strangers with Candy - S1E9 - Jerri is Only Skin Deep",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/a7a28gcdj0w766fq1c31r/StrangersWithCandyS1E9.mp4?rlkey=ntfkgeai7k4lmbfufyhjpq62i&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/a7a28gcdj0w766fq1c31r/StrangersWithCandyS1E9.mp4?rlkey=ntfkgeai7k4lmbfufyhjpq62i&dl=1",
  },
  {
    ref: 1425,
    title: "Strangers with Candy - S1E10 - The Trip Back",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/u18bj9aanto8t02ta4995/StrangersWithCandyS1E10.mp4?rlkey=0w9n6hxifbewu78e6gqbgnfih&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/u18bj9aanto8t02ta4995/StrangersWithCandyS1E10.mp4?rlkey=0w9n6hxifbewu78e6gqbgnfih&dl=1",
  },
  {
    ref: 1426,
    title: "Strangers with Candy - S2E1 - The Virgin Jerri",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/vaxekettn4awlfdbxqt7f/StrangersWithCandyS2E1.mp4?rlkey=gw4dsyct20v9mpfkzm1swzv66&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/vaxekettn4awlfdbxqt7f/StrangersWithCandyS2E1.mp4?rlkey=gw4dsyct20v9mpfkzm1swzv66&dl=1",
  },
  {
    ref: 1427,
    title: "Strangers with Candy - S2E2 - Behind Blank Eyes",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/01qvhudk6fw75g4kk7u55/StrangersWithCandyS2E2.mp4?rlkey=52rpiapk5baxrw9apugtbn9xr&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/01qvhudk6fw75g4kk7u55/StrangersWithCandyS2E2.mp4?rlkey=52rpiapk5baxrw9apugtbn9xr&dl=1",
  },
  {
    ref: 1428,
    title: "Strangers with Candy - S2E3 - Yes You Can't",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/n8cb6nyxbtuay8ztz8a40/StrangersWithCandyS2E3.mp4?rlkey=rw1nhoe9wynwmt8pv6ks7o53m&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/n8cb6nyxbtuay8ztz8a40/StrangersWithCandyS2E3.mp4?rlkey=rw1nhoe9wynwmt8pv6ks7o53m&dl=1",
  },
  {
    ref: 1429,
    title: "Strangers with Candy - S2E4 - The Goodbye Guy",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/rnquz8w4n4tq78bpmirjc/StrangersWithCandyS2E4.mp4?rlkey=b5oyh90i6t5au7ir1v5guc9z8&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/rnquz8w4n4tq78bpmirjc/StrangersWithCandyS2E4.mp4?rlkey=b5oyh90i6t5au7ir1v5guc9z8&dl=1",
  },
  {
    ref: 1430,
    title: "Strangers with Candy - S2E5 - The Blank Page",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/azhjtupouki8bacri9mlj/StrangersWithCandyS2E5.mp4?rlkey=ti0o2tavqhdvmclbwmfos7uq4&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/azhjtupouki8bacri9mlj/StrangersWithCandyS2E5.mp4?rlkey=ti0o2tavqhdvmclbwmfos7uq4&dl=1",
  },
  {
    ref: 1431,
    title: "Strangers with Candy - S2E6 - Hit and Run",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/1ckzeust5qimstql83146/StrangersWithCandyS2E6.mp4?rlkey=95ejk1xvt0pb192456kpbjbqo&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/1ckzeust5qimstql83146/StrangersWithCandyS2E6.mp4?rlkey=95ejk1xvt0pb192456kpbjbqo&dl=1",
  },
  {
    ref: 1432,
    title: "Strangers with Candy - S2E7 - To Love, Honor and Pretend",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/uqw3w8rirzen62bs7nkse/StrangersWithCandyS2E7.mp4?rlkey=mvyquzos9yqobt2e7qgsiglle&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/uqw3w8rirzen62bs7nkse/StrangersWithCandyS2E7.mp4?rlkey=mvyquzos9yqobt2e7qgsiglle&dl=1",
  },
  {
    ref: 1433,
    title: "Strangers with Candy - S2E8 - The Blank Stare (1)",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/ypncl02xh6zfxlagswbs5/StrangersWithCandyS2E8.mp4?rlkey=8ujuqde5j7ue60ki3ny2pnuuq&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/ypncl02xh6zfxlagswbs5/StrangersWithCandyS2E8.mp4?rlkey=8ujuqde5j7ue60ki3ny2pnuuq&dl=1",
  },
  {
    ref: 1434,
    title: "Strangers with Candy - S2E9 - The Blank Stare (2)",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/lduubj884l5yf43hgbg1i/StrangersWithCandyS2E9.mp4?rlkey=77k767cr109gdayozuouh6hj1&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/lduubj884l5yf43hgbg1i/StrangersWithCandyS2E9.mp4?rlkey=77k767cr109gdayozuouh6hj1&dl=1",
  },
  {
    ref: 1435,
    title: "Strangers with Candy - S2E10 - A Price Too High for Riches",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/3s31dys50m34jxdka2k0b/StrangersWithCandyS2E10.mp4?rlkey=2rlt0nj6px7qlu1n2ce9jkv3c&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/3s31dys50m34jxdka2k0b/StrangersWithCandyS2E10.mp4?rlkey=2rlt0nj6px7qlu1n2ce9jkv3c&dl=1",
  },
  {
    ref: 1436,
    title: "Strangers with Candy - S3E1 - Jerri's Burning Issue",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/3tmace3z5d2cdpb3sw8dt/StrangersWithCandyS3E1.mp4?rlkey=lsuvvq1961vc0mqc5w4csyt1d&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/3tmace3z5d2cdpb3sw8dt/StrangersWithCandyS3E1.mp4?rlkey=lsuvvq1961vc0mqc5w4csyt1d&dl=1",
  },
  {
    ref: 1437,
    title: "Strangers with Candy - S3E2 - Is Freedom Free?",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/pw2bax6bne9vuc2p13y6g/StrangersWithCandyS3E2.mp4?rlkey=ix2u6jomsdupi418hh2yp26g0&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/pw2bax6bne9vuc2p13y6g/StrangersWithCandyS3E2.mp4?rlkey=ix2u6jomsdupi418hh2yp26g0&dl=1",
  },
  {
    ref: 1438,
    title: "Strangers with Candy - S3E3 - Trail Of Tears",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/robgdsm3zekz51tmrzri9/StrangersWithCandyS3E3.mp4?rlkey=nm4mpbfg7likjwgvwvvqthgtf&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/robgdsm3zekz51tmrzri9/StrangersWithCandyS3E3.mp4?rlkey=nm4mpbfg7likjwgvwvvqthgtf&dl=1",
  },
  {
    ref: 1439,
    title: "Strangers with Candy - S3E4 - Invisible Love",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/5l5rpowkhzeef4x1zlcmt/StrangersWithCandyS3E4.mp4?rlkey=mayh3cfyj6vsxl6nl7xxm356g&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/5l5rpowkhzeef4x1zlcmt/StrangersWithCandyS3E4.mp4?rlkey=mayh3cfyj6vsxl6nl7xxm356g&dl=1",
  },
  {
    ref: 1440,
    title: "Strangers with Candy - S3E5 - Is My Daddy Crazy?",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/zcmgodajrcgjvic10ckxy/StrangersWithCandyS3E5.mp4?rlkey=byhiktmyc5l7ui40e7a7r19ad&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/zcmgodajrcgjvic10ckxy/StrangersWithCandyS3E5.mp4?rlkey=byhiktmyc5l7ui40e7a7r19ad&dl=1",
  },
  {
    ref: 1441,
    title: "Strangers with Candy - S3E6 - Blank Relay",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/qqzue2p3ds79wsm204frq/StrangersWithCandyS3E6.mp4?rlkey=8c0n5jim5xp87cgo9tqe4ff3t&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/qqzue2p3ds79wsm204frq/StrangersWithCandyS3E6.mp4?rlkey=8c0n5jim5xp87cgo9tqe4ff3t&dl=1",
  },
  {
    ref: 1442,
    title: "Strangers with Candy - S3E7 - Ask Jerri",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/qw3j1o4x5z66ccrjvjvv1/StrangersWithCandyS3E7.mp4?rlkey=hx3vugtmby97uzhmovg2a4nkn&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/qw3j1o4x5z66ccrjvjvv1/StrangersWithCandyS3E7.mp4?rlkey=hx3vugtmby97uzhmovg2a4nkn&dl=1",
  },
  {
    ref: 1443,
    title:
      "Strangers with Candy - S3E8 - Sexual Harrassment (a.k.a. There Once Was A Blank From Nantucket)",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/4n4p5c7lmioo3wbvmgr2i/StrangersWithCandyS3E8.mp4?rlkey=tb54vvamjw84q5p2artrze1uz&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/4n4p5c7lmioo3wbvmgr2i/StrangersWithCandyS3E8.mp4?rlkey=tb54vvamjw84q5p2artrze1uz&dl=1",
  },
  {
    ref: 1444,
    title: "Strangers with Candy - S3E9 - Bully",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/6mu070a3mk3tuj0zs9z74/StrangersWithCandyS3E9.mp4?rlkey=r5o5jkuz94y4jc0i1vjg5vqez&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/6mu070a3mk3tuj0zs9z74/StrangersWithCandyS3E9.mp4?rlkey=r5o5jkuz94y4jc0i1vjg5vqez&dl=1",
  },
  {
    ref: 1445,
    title: "Strangers with Candy - S3E10 - The Last Temptation Of Blank",
    year: 2000,
    genre: "Shows",
    collection: ["Strangers with Candy", "Pet Things"],
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/608jh6edldmdu437yp7sl/StrangersWithCandyS3E10.mp4?rlkey=psd6buobem348ukutc6usf71y&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/608jh6edldmdu437yp7sl/StrangersWithCandyS3E10.mp4?rlkey=psd6buobem348ukutc6usf71y&dl=1",
  },
];

module.exports = flicksShows;
