import { TicketType } from '../ticket.entity';

export class UpdateTicketsDto {
  reservationId: number;
  selectedTickets: Array<SelectedTickets>;
}

type SelectedTickets = { seat: string; type: TicketType };
