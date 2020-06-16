import React from 'react';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { Grid, Checkbox } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export const MyForm = () => {
  const [accessToken, setAccessToken] = React.useState('');
  const [albumNameLength, setAlbumNameLength] = React.useState(3);
  const [useDefaultWordList, setUseDefaultWordList] = React.useState(false);
  const [wordList, setWordList] = React.useState('');

  const onFinish = () => {
    console.log('finished');
  }

  const onFinishFailed = () => {
    console.log('failed');
  }

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 0 },
  };

  return (
      <Grid container>
        <Grid item md={4}/>
        <Grid item md={4}>
          <h1 style={ { marginTop: '20px' } }>Google Photos Album Generator</h1>
          <p>
            Easily generate Google Photos album for testing purposes!
          </p>
          <form>
            <div style={{marginBottom: '20px'}}>
              <TextField
                  id="outlined-basic"
                  value={accessToken}
                  onChange={e => setAccessToken(e.target.value)}
                  label="Access token"
                  fullWidth
                  variant="outlined"/>
            </div>
            <div style={{marginBottom: '20px'}}>
              <TextField
                  id="outlined-basic"
                  disabled={useDefaultWordList}
                  value={useDefaultWordList ? lorem : wordList}
                  onChange={e => setWordList(e.target.value)}
                  label="Word list (comma separated)"
                  multiline
                  fullWidth
                  variant="outlined"/>
            </div>
            <Typography
                id="discrete-slider"
                gutterBottom>
              Temperature
            </Typography>
            <Slider
                defaultValue={ 3 }
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={ 1 }
                marks
                min={ 1 }
                max={ 6 }
                value={albumNameLength}
                onChange={(e, value) => setAlbumNameLength(value)}
            />
            <div>
              <FormControlLabel
                  control={
                    <Checkbox
                        checked={useDefaultWordList}
                        onChange={e => setUseDefaultWordList(!useDefaultWordList)}
                        name="checkedB"
                        color="primary"
                    />
                  }
                  label="Use default word list"
              />
            </div>
            <Button variant="contained" color="primary" disableElevation>
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item md={4}/>
      </Grid>
  )
}

const generateAlbumName = (words, maxlen) => {
  let segments = words.replace(' ', '').filter(word => word.length < 12).split(',');
  let sanitized = [];
  for (let segment of segments) {
    let word = '';
    for (let i = 0; i < segment.length; i++) {
      if (segment[i] !== ' ') {
        word += segment[i];
      }
    }
    sanitized.push(word.toUpperCase());
  }
  let name = [];
  for (let i = 0; i < maxlen; i++) {
    let index = Math.floor(Math.random() * (sanitized.length - 0 + 1));
    name.push(sanitized[index]);
  }
  return name;
}

const lorem = 'quote, beaut, beaute, bloat, blote, boat, boate, brote, choat, choate, cloete, clote, coat, cote, croate, dhote, dote, dought, float, flote, frote, ghaut, gloat, goat, groat, groet, grote, haute, hote, knout, kote, moat, mote, noght, note, plote, pote, prot-, prote, quote, roat, rote, schaut, scoat, scote, scrote, shoat, shote, showoff, sloat, sloate, sloot, smote, sproat, stoat, stote, throat, tote, troat, trote, vote, wrote, unquote, achote, afloat, anote, aptote, ayote, azote, bacote, banknote, bank note, banxquote, bedote, bell cote, bequote, blue note, booknote, box coat, brunch coat, capote, cerote, chamotte, chayote, chilcoat, chilcote, chimbote, chipote, commote, connote, cutthroat, demote, denote, devote, diptote, ducote, dust coat, eighth note, elote, emote, endnote, fistnote, fivecoat, flatboat, flat coat, footnote, frock coat, fur coat, garote, garrotte, gemote, gnu goat, grace note, guard boat, gunboat, half note, hathcoat, hinote, houseboat, ignote, incoact, jefcoat, keynote, lifeboat, mail boat, mink coat, misquote, nilote, obote, outvote, pilote, popote, portmote, prenote, promote, raincoat, raw throat, rebote, recoat, redcoat, refloat, remote, revote, rewrote, rowboat, sack coat, sailboat, sapote, scapegoat, scare quote, sea boat, showboat, small boat, sore throat, speedboat, sports coat, steamboat, straw vote, strep throat, tail coat, take note, time note, towboat, trench coat, tugboat, turncoat, uncoat, unquote, unsought, unvote, vannote, wescoat, whole note, wild goat, zapote'
