export const enroll = async (pitchId: number) => {
  const req = await fetch("/api/pitches/registered", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pitchId,
    }),
  });
  const res = await req.json();
  if (res.message == "success") {
    return res["registered_pitch"];
  }
  return res;
};

export const unenroll = async (id: number) => {
  try {
    const req = await fetch("/api/pitches/registered", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const res = await req.json();
    if (res.message == "success") {
      return res["delete_pitch"];
    }
  } catch (error) {
    console.log(error);
  }
};

export const addToNote = async (data: any) => {
  try {
    const req = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word: data.word,
        definition: data.definitions[0].text,
        sentence: data.examples[0].text,
        date: data.date,
        partofspeech: data.definitions[0].partOfSpeech,
      }),
    });
    const res = await req.json();
    return res
  } catch (error) {
    return error
  }
};
