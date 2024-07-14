import { toast } from "@/components/ui/use-toast";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method?: RequestMethod;
  body?: any;
}

async function makeApiCallService(
  url: string,
  options: RequestOptions = {}
): Promise<IResponse | null> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method: options.method || "GET",
      headers,
      body: JSON.stringify(options.body),
    });

    if (!response.ok) {
      const res = await response.json();
      toast({
        variant: "destructive",
        title: "Error",
        description: res?.response?.meta?.message,
      });
      return null;
    }

    const data: any = await response.json();
    if (response.ok) {
      toast({
        variant: "default",
        title: "Success",
        description: data?.response?.meta?.message,
      });
    }

    return data;
  } catch (error) {
    toast({
      title: "API Service error",
      description: `An error occurred while making the API call: ${
        ((error as unknown) as any)?.message
      }`,
    });

    return null;
  }
}

export default makeApiCallService;
