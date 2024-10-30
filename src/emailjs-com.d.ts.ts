declare module '@emailjs-com' {
    export function send(
      service_id: string,
      template_id: string,
      template_params: { [key: string]: any },
      user_id?: string
    ): Promise<any>;
  };
  