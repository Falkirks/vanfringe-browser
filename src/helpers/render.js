import $ from "jquery";

export const drawTable = (data) => {

  $.fn.dataTable.moment( 'M/D/YYYY h:mm A' );
  $('#eventsTable').DataTable({
    dom: 'Bfrtip',
    paging: false,
    "scrollY": "400px",
    "scrollCollapse": true,
    data: data,
    columns: [
      { data: 'Show.Name', title: 'Event name' },
      { data: 'HallName', title: 'Venue'},
      { data: 'FormattedDate', title: 'Time', visible: false },
      { data: 'day', title: 'Day'},
      { data: 'time', title: 'Start time', className: 'timeSlot'},
      { data: 'endTime', title: 'End time', className: 'timeSlot'},
      { data: 'SoldTickets', title: 'Tickets Sold' },
      { data: 'AvailableCapacity', title: 'Tickets left' }
    ],
    order: [[3, 'asc']],
    buttons: [
      'excel',
      {
        extend: 'pdfHtml5',
        messageTop: 'PDF generated with vanfringe-browser by noa.',
        filename: 'fringe',
        title: 'Vancouver Fringe events'
      },
      'colvis',
      {
        text: 'What is this?',
        action: ( e, dt, node, config ) => {
          window.open('why.html');
        }
      },
      {
        text: 'Open',
        action: ( e, dt, node, config ) => {
          const selectedRows = dt.rows( { selected: true } ).data();
          for(let i = 0;  i < selectedRows.length; i++){
            const {BrowserWindow} = require('electron').remote;
            let win = new BrowserWindow({
              show: false,
              width: 700,
              height: 500,
              titleBarStyle: 'hidden',
              backgroundColor: "#FFF"
            });
            win.loadURL(`file://${__dirname}/show.html`);
            win.once('ready-to-show', () => {
              win.webContents.send('show-info', selectedRows[i]);
              win.show();
            })
          }
        }
      }
    ],
    select: {
      style: 'os'
    }
  });

};
