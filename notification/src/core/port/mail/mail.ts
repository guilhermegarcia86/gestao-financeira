import { EmailDTO } from "@/core/service";

export interface Mail {
    send: (emailDTO: EmailDTO) => Promise<void>
  }
  