// GC8GHG5 and GC8GJW0 solution helper
//
// We're operating under the assumption that the task given is to find
// a targeted exhaustive path through the matrix that starts at left bottom
// corner and ends in right bottom corner (marked as IN and OUT in the
// listing). Such path will result in a vector with 256 numbers referenced
// by encoded coordinates, which are vectors of 7 numbers. At the time of
// writing I have not found the solution, so the above might be wrong.

// source 16x16 matrix given in the listing; this is the same for both caches

const remizky_src = [
  [ 1, 8, 9, 0, 4, 3, 2, 4, 6, 2, 9, 6, 7, 8, 2, 5 ],
  [ 9, 5, 0, 4, 3, 7, 2, 0, 5, 6, 1, 3, 2, 5, 4, 9 ],
  [ 2, 9, 6, 8, 0, 5, 4, 8, 7, 0, 4, 0, 5, 2, 1, 7 ],
  [ 3, 5, 4, 6, 5, 1, 3, 7, 2, 9, 5, 4, 2, 5, 8, 0 ],
  [ 0, 4, 7, 2, 5, 6, 2, 1, 3, 0, 5, 4, 2, 0, 3, 9 ],
  [ 4, 0, 3, 8, 9, 5, 7, 4, 5, 6, 1, 0, 7, 1, 3, 5 ],
  [ 2, 5, 2, 7, 2, 0, 8, 4, 3, 0, 5, 2, 4, 6, 5, 4 ],
  [ 9, 7, 3, 6, 5, 9, 2, 0, 1, 2, 0, 4, 1, 7, 0, 8 ],
  [ 1, 9, 5, 0, 1, 2, 4, 7, 5, 4, 3, 2, 6, 5, 5, 2 ],
  [ 7, 5, 0, 4, 6, 4, 5, 9, 8, 4, 6, 8, 2, 3, 7, 2 ],
  [ 0, 1, 3, 4, 5, 3, 9, 6, 4, 5, 4, 0, 7, 1, 9, 2 ],
  [ 5, 2, 3, 0, 7, 9, 1, 2, 5, 2, 4, 0, 6, 4, 6, 5 ],
  [ 7, 3, 2, 0, 6, 6, 4, 2, 9, 2, 1, 7, 5, 0, 4, 6 ],
  [ 6, 8, 6, 4, 7, 5, 9, 0, 5, 7, 6, 4, 7, 1, 2, 3 ],
  [ 0, 2, 5, 1, 4, 2, 1, 7, 4, 5, 3, 6, 5, 4, 9, 1 ],
  [ 5, 3, 2, 4, 6, 8, 5, 0, 7, 1, 9, 7, 6, 4, 5, 0 ],
];

// some of the numbers in the source matrix in the listing are visibly smaller
// then the usual type size ("mystery squares"), these numbers are marked with
// '1' in the matrix below

const remizky_mark = [
  [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
  [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ],
  [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1 ],
];

// Encoded coordinates for both caches; this can be used for some forms of
// heuristics as first three or four numbers can be guessed

const coords_key = {
  lat1: [ 143, 121, 226, 58, 178, 238, 48 ],
  lon1: [ 236, 127, 131, 108, 73, 167, 64 ],
  lat2: [ 99, 26, 127, 252, 138, 75, 33 ],
  lon2: [ 184, 77, 128, 51, 156, 177, 49 ],
};

/*--- auxiliary functions ---------------------------------------------------*/

function get_empty_table(template)
{
  let new_table = [];

  for(let i = 0; i < template.length; i++) {
    new_table[i] = [];
    for(let j = 0; j < template[0].length; j++) {
      new_table[i][j] = undefined;
    }
  }

  return new_table;
}

function get_additional_info(src, mark)
{
  let re = {
    all: {
      numbers: [ 0,0,0,0,0,0,0,0,0,0 ]
    },
    marked: {
      list: [],
      numbers: [ 0,0,0,0,0,0,0,0,0,0 ]
    }
  };

  for(let i = 0; i < src.length; i++) {
    for(let j = 0; j <src[0].length; j++) {
      if(mark[i][j]) {
        re.marked.list.push([i,j]);
        re.marked.numbers[ src[i][j] ]++;
      }
      re.all.numbers[ src[i][j] ]++;
    }
  }

  return re;
}

/*--- main ------------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", function(event) {

  var vm = new Vue({
    el: '#app',
    data: {
      key: {},
      encoderTable: remizky_src,
      pathTable: get_empty_table(remizky_src),
      markTable: remizky_mark,
      moreInfo: get_additional_info(remizky_src, remizky_mark),
      showPath: false,
      // this records the user selected path as an array of coordinates
      path: [],
      // encoded coordinates from the listings
      coords_key: coords_key,
      coords_key_map: {
        lat1: coords_key.lat1.map(() => false),
        lon1: coords_key.lon1.map(() => false),
        lat2: coords_key.lat2.map(() => false),
        lon2: coords_key.lon2.map(() => false),
      },
      decode: {
        lat1: coords_key.lat1.map(() => undefined),
        lon1: coords_key.lon1.map(() => undefined),
        lat2: coords_key.lat2.map(() => undefined),
        lon2: coords_key.lon2.map(() => undefined),
      }
    },

    mounted() {
      let table = document.getElementsByClassName('table')[0];
      table.addEventListener('mousedown', evt => {

        if(evt.target.classList.contains('cell') && evt.buttons & 1) {
          this.selectCell(evt);
        }

        let mouseoverHandler = evt => {
          if(evt.buttons & 1) {
            if(evt.target.classList.contains('cell')) {
              this.selectCell(evt);
            }
          } else {
            table.removeEventListener("mouseover", mouseoverHandler, false);
          }
        };

        table.addEventListener("mouseover", mouseoverHandler, false);

      }, false);
    },

    computed: {
      width() { return this.encoderTable[0].length },
      height() { return this.encoderTable.length },
      viewTable() {
        return this.showPath ? this.pathTable : this.encoderTable;
      },
    },

    methods: {

      addCell(i,j) {
        if(typeof(this.pathTable[i][j]) === 'undefined') {
          Vue.set(this.pathTable[i], j, this.path.length + 1);
          this.path.push([i,j]);
        }
      },

      clear() {
        this.pathTable = get_empty_table(remizky_src);
        this.path = [];
      },

      clearOne() {
        let removed = this.path.pop();
        Vue.set(this.pathTable[removed[0]], removed[1], undefined);
      },

      switchView() {
        this.showPath = !this.showPath;
      },

      // for a coords_key array return map that denotes elements that have
      // already been reached by user's path selection
      keyReached(key) {
        return coords_key[key].map(n => n <= this.path.length);
      },

      // for a coords_key array decode values that were already reached
      decodeFromPath(key) {
        return coords_key[key].map(n => {
          if(n <= this.path.length) {
            let i, j; [i,j] = this.path[n-1];
            return this.encoderTable[i][j];
          } else {
            return undefined;
          }
        })
      },

      // selectCell
      selectCell(evt) {
        const el = evt.target;
        const col = [...el.parentElement.children].indexOf(el);
        const row = [...el.parentElement.parentElement.children].indexOf(el.parentElement);
        this.addCell(row, col);
      }

    },

    watch: {
      path() {
        this.coords_key_map.lat1 = this.keyReached('lat1');
        this.coords_key_map.lon1 = this.keyReached('lon1');
        this.coords_key_map.lat2 = this.keyReached('lat2');
        this.coords_key_map.lon2 = this.keyReached('lon2');
        this.decode.lat1 = this.decodeFromPath('lat1');
        this.decode.lon1 = this.decodeFromPath('lon1');
        this.decode.lat2 = this.decodeFromPath('lat2');
        this.decode.lon2 = this.decodeFromPath('lon2');
      },
    }
  });

});
