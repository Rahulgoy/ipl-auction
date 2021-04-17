import firebase from "firebase";
export const Bids = ({ playerId, biddingprice }) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const teamId = getState().firebase.auth.uid;
    firestore
      .collection("players")
      .doc(playerId)
      .collection("Bids")
      .doc(teamId)
      .add({
        bid: [
          {
            biddingprice: biddingprice,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          },
        ],
      })
      .then(() => {
        dispatch({
          type: "ADD_BID",
        });
      })
      .catch((err) => {
        dispatch(
          {
            type: "ADD_BID_ERROR",
          },
          err
        );
      });

    const maxi = 0;
    firestore
      .collection("players")
      .where("name", "==", playerId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log("Max:", doc.data().maxbid);
          maxi = doc.data().maxbid;
        });
      });
    if (maxi < biddingprice) {
      firestore.collection("players").doc(playerId).update({
        maxbid: biddingprice,
        maxbidBy: teamId,
      });
    }
  };
};
