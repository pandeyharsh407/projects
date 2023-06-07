// C++ program for implementation of KMP pattern searching
// algorithm
#include<iostream>
#include<string>
#include<algorithm>

using namespace std;
void computeLPS(char* pat, int M, int* lps);   // funtion prototype

// Prints occurrences of txt[] in pat[]
void KMPSearch(char* pat, char* txt)
{
	int N = strlen(txt); //length of text string
	int M = strlen(pat); //length of pattern string

	// create lps[] that will hold the longest prefix suffix
	// values for pattern
	int lps[M]; 

	// Preprocess the pattern (calculate lps[] array)
	computeLPS(pat, M, lps);

	int i = 0; // index for txt[]
	int j = 0; // index for pat[]
	while ((N - i) >= (M - j)) 
	{
		if (pat[j] == txt[i]) 
		{
			j++;
			i++;
		}

		if (j == M) 
		{
			printf("Found pattern at index %d ", i - j);
			j = lps[j - 1];
		}

		// mismatch after j matches
		else if (i < N && pat[j] != txt[i]) 
		{
			// Do not match lps[0..lps[j-1]] characters,
			// they will match anyway
			if (j != 0)
				j = lps[j - 1];
			else
				i = i + 1;
		}
	}
}

// Fills lps[] for given pattern pat[0..M-1]
void computeLPS(char* pat, int M, int* lps)
{
	// length of the previous longest prefix suffix
	int len = 0;

	lps[0] = 0; // lps[0] is always 0

	// the loop calculates lps[i] for i = 1 to M-1
	int i = 1;
	while (i < M) {
		if (pat[i] == pat[len]) 
		{
			len++;
			lps[i] = len;
			i++;
		}
		else // (pat[i] != pat[len])
		{
			// This is tricky. Consider the example.
			// AAACAAAA and i = 7. The idea is similar
			// to search step.
			if (len != 0) 
			{
				len = lps[len - 1];

				// Also, note that we do not increment
				// i here
			}
			else // if (len == 0)
			{
				lps[i] = 0;
				i++;
			}
		}
	}
}

// Driver code
int main()
{
	char txt[] = "ABABDABACDABABCABAB";
    cout<<"the text string:-"<<'\n';
    for(int i=0; i<strlen(txt); i++)
        cout<<txt[i]<<' ';
    cout<<endl;

	char pat[] = "ABABCABAB";
    cout<<"the text string:-"<<'\n';
    for(int i=0; i<strlen(pat); i++)
        cout<<pat[i]<<' ';
    cout<<endl;

	KMPSearch(pat, txt);
    cout<<endl;
	return 0;
}




