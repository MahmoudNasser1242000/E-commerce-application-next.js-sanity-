import * as React from 'react';
import { Section, Img, Text, Heading, Button } from "@react-email/components";
import { ICart } from '@/types';

interface EmailTemplateProps {
    cart: ICart;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ cart }) => {
    return (
        <Section style={{ padding: "16px 0", textAlign: "center" }}>
            <table role="presentation" width="100%" style={{ borderSpacing: 0, borderCollapse: "collapse" }}>
                <tr>
                    <td align="center">
                        <Img
                            alt="Payment Successful"
                            width={400}
                            height={400}
                            src="https://cdn3d.iconscout.com/3d/premium/thumb/payment-successful-7940652-6294950.png"
                            style={{
                                display: "block",
                                border: "0",
                                borderRadius: "12px", // Some email clients might ignore this
                                maxWidth: "100%", // Responsive
                                height: "auto",
                            }}
                        />
                    </td>
                </tr>
            </table>
            <Section style={{ marginTop: "10px", textAlign: "center" }}>
                <Text style={{
                    marginTop: "16px",
                    fontSize: "18px",
                    fontWeight: "600",
                    lineHeight: "28px",
                    color: "#3B82F6" // Indigo-600
                }}>
                    E-commerce store
                </Text>
                <Heading as="h1" style={{
                    fontSize: "36px",
                    fontWeight: "600",
                    lineHeight: "40px",
                    letterSpacing: "0.4px",
                    color: "#111827" // Gray-900
                }}>
                    Payment Successful!
                </Heading>
                <Text style={{
                    marginTop: "8px",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#6b7280" // Gray-500
                }}>
                    Your payment has been successfully processed, and your order is now confirmed! A confirmation email with your order details has been sent to your inbox. If you have any questions or need further assistance, feel free to reach out to our support team. Thank you for shopping with us!
                </Text>
                <Text style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                    color: "#111827" // Gray-900
                }}>
                    ${cart.products.reduce((act, curr) => act + curr.price, 0)}
                </Text>
                <Button
                    style={{
                        marginTop: "16px",
                        borderRadius: "4px",
                        backgroundColor: "#3B82F6", // Indigo-600
                        padding: "12px 24px",
                        fontWeight: "600",
                        color: "white",
                        textDecoration: "none",
                        display: "inline-block"
                    }}
                    href="https://my-store-app-steel.vercel.app/"
                >
                    Visit Us
                </Button>
            </Section>
        </Section>
    )
};