export const enroll = async (pitchId: number) => {
  try {
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
    console.log(res.message);
  } catch (error) {
    console.log(error);
  }
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
    console.log(res.message);
  } catch (error) {
    console.log(error);
  }
};
