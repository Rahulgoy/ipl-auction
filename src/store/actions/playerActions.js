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
  };
};
